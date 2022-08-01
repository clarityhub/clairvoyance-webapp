import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import xhr from 'xhr';

import {
  reconnecting,
  reconnected,
  reconnectFailed,
} from '../actions';
import Socket from '../socket/Socket';
import SocketStatus from './SocketStatus';

class SocketComponent extends Component {
  static propTypes = {
    rtcUrl: string.isRequired,
  }

  isForeground = true;
  onForeground = () => {};

  componentDidMount() {
    const { rtcUrl, token, handleReconnected, handleReconnectFailed } = this.props;

    document.addEventListener('pause', this.onPause, false);
    document.addEventListener('resume', this.onResume, false);

    this.connect(rtcUrl, token, {
      onSuccess: handleReconnected,
      onFailure: handleReconnectFailed,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('pause', this.onPause, false);
    document.removeEventListener('resume', this.onResume, false);

    this.socket.close();
  }

  reconnect = (attempt = 1) => {
    const {
      rtcUrl,
      token,
      handleReconnecting,
      handleReconnected,
      handleReconnectFailed,
    } = this.props;

    const backOff = Math.min(attempt * attempt * 1000, 10000);

    // If mobile, wait for app to be in foreground
    handleReconnectFailed();

    clearTimeout(this.lastTimeout);
    this.lastTimeout = setTimeout(() => {
      this.setOnForeground(() => {
        this.connect(rtcUrl, token, {
          onStart: handleReconnecting,
          onSuccess: handleReconnected,
          // onFailure: handleReconnectFailed,
          attempt,
        });
      });
    }, backOff);
  }

  /**
   * Create a websocket connection.
   * 
   * This will use the current token to get
   * a new token for connecting to the websocket.
   * 
   * These tokens are one-time use, so if the socket
   * need to reconnect, it is necessary to re-request
   * a socket token.
   */
  connect = (rtcUrl, token, {
    onStart,
    onSuccess,
    onFailure,
    attempt,
  } = {}) => {
    if (onStart) onStart();
    this.socket = new Socket(rtcUrl);

    this.request = xhr({
      method: 'post',
      body: '',
      url: `${rtcUrl}/tokens`,
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    }, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        if (onFailure) onFailure();
        const nextAttempt = attempt ? attempt + 1 : 1;

        this.reconnect(nextAttempt);
      } else {
        const b = body ? JSON.parse(body) : {};

        this.socket.setReconnectCallback(this.reconnect);
        this.socket.connect(b.token);

        if (onSuccess) onSuccess();
      }
    });
  }

  setOnForeground = (func) => {
    this.onForeground = func;

    if (this.isForeground) {
      this.onForeground();
    }
    // Otherwise, on resume we will run the function
  }

  onPause = () => {
    this.isForeground = false;
  }

  onResume = () => {
    this.isForeground = true;
    this.onForeground();
  }

  render() {
    const { status } = this.props;

    return <SocketStatus status={status} />;
  }
}

export default connect(
  state => ({
    token: state.auth.token,
    status: state.socket.status,
  }),
  {
    handleReconnecting: reconnecting,
    handleReconnected: reconnected,
    handleReconnectFailed: reconnectFailed,
  }
)(SocketComponent);

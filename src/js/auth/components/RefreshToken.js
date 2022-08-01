import { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import checkToken from '../utilities/checkToken';
import { refresh, logout } from '../actions';

/**
The refresh rate is every hour, so we will request
a new one every 40 minutes
*/
const REFRESH_RATE = 40 * 60 * 1000;

class RefreshToken extends Component {
  static propTypes = {
    handleRefresh: func.isRequired,
  }

  isForeground = true;
  onForeground = () => {};

  componentDidMount() {
    const { token, handleRefresh, handleLogout } = this.props;

    document.addEventListener('pause', this.onPause, false);
    document.addEventListener('resume', this.onResume, false);

    checkToken(token, {
      onRefresh: handleRefresh,
      onLogout: handleLogout,
    });

    this.refreshToken();
  }

  componentWillUnmount() {
    document.removeEventListener('pause', this.onPause, false);
    document.removeEventListener('resume', this.onResume, false);

    // Kill the lifecycle
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  refreshToken = () => {
    this.timer = setTimeout(() => {
      this.setOnForeground(() => {
        this.clarityRequest = this.props.handleRefresh();

        this.clarityRequest.response.then(() => {
          // Set it again
          this.refreshToken();
        }).catch(() => {
          this.props.handleLogout();
        });
      });
    }, REFRESH_RATE);
  };

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
    return null;
  }
}

export default connect(
  (state) => ({
    token: state.auth.token,
  }),
  {
    handleRefresh: refresh,
    handleLogout: logout,
  }
)(RefreshToken);

import uuid from 'uuid/v4';
import io from 'socket.io-client';
import middleware from 'socketio-wildcard';
import { handleEvent } from './handler';
import device from './device';

export let latestSocket = null;

export default class Socket {
  constructor(rtcUrl) {
    this.rtcUrl = rtcUrl;
    this.socket = null;
    this.attemptReconnect = true;
    this.reconnect = () => {};
    this.callbacks = [];

    this.connect = this._connect.bind(this);

    latestSocket = this;
  }

  _connect(token) {
    const url = new URL(this.rtcUrl);
    this.socket = io(url.origin, {
      path: url.pathname + '/socket.io',
      // We'll take care of reconnecting since the websocket must be authenticated
      reconnection: false,
      query: {
        token,
        device: device + uuid(),
      },
    });

    // TODO use the user's latest status
    this.socket.emit('status.updated', {
      type: 'status.updated',
      ts: +new Date(),
      meta: {
        status: 'online',
      },
    });

    const patch = middleware(io.Manager);
    patch(this.socket);

    this.socket.on('disconnect', () => {
      if (this.attemptReconnect) {
        // Trigger reconnection
        this.reconnect();
      }
    });

    this.socket.on('*', (event) => {
      handleEvent(event);
    });
  }

  setReconnectCallback(func) {
    this.reconnect = func;
  }

  close() {
    if (this.socket) {
      this.attemptReconnect = false;
      this.socket.disconnect();
    }
  }
}

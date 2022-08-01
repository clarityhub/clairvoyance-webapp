/* global PushNotification */
import { Component } from 'react';
import { func, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { registerDevice } from 'js/socket/actions';

class PushNotifications extends Component {
  static propTypes = {
    history: shape({
      push: func.isRequired,
    }).isRequired,
    numberOfNotifications: number,
    registerDevice: func.isRequired,
  }

  componentDidMount() {
    const { history, registerDevice } = this.props;

    document.addEventListener('pause', this.onPause, false);
    document.addEventListener('resume', this.onResume, false);

    // Register the application
    this.push = PushNotification.init({
      android: {
        senderID: process.env.REACT_APP_SENDER_ID,
        sound: true,
        vibrate: true,
      },
      browser: {},
      ios: {
        sound: true,
        vibration: true,
        badge: true,
      },
    });

    this.push.on('registration', (data) => {
      const oldRegId = localStorage.getItem('registrationId');

      if (oldRegId !== data.registrationId) {
        localStorage.setItem('registrationId', data.registrationId);

        // send app server the new value
        registerDevice(data.registrationId);
      }
    });

    this.push.on('error', (e) => {
      if (window.Bugsnag) {
        window.Bugsnag.notifyException(e);
      }
    });

    this.push.on('notification', (data) => {
      const isBackgroundMessage = !data.additionalData.foreground ||
        data.additionalData.coldstart;

      if (isBackgroundMessage) {
        // The notification was received while the app was loaded
        // in the background, let's redirect to where we should
        // go:

        if (data.additionalData.chatUuid) {
          // Redirect
          history.push(`/chats/${data.additionalData.chatUuid}`);
        }
      }

      // TODO received a notification while the app was open
      // Eventually show the notification in-app
    });
  }

  componentWillReceiveProps(nextProps) {
    this.push.setApplicationIconBadgeNumber(function () {}, function () {}, nextProps.numberOfNotifications);
  }

  componentWillUnmount() {
    // XXX unmount event listeners
  }

  onPause = () => {
    window.mute = true;
  }

  onResume = () => {
    window.mute = false;
  }

  render() {
    return null;
  }
}

export default connect(
  (state) => {
    return {
      numberOfNotifications: state.notifications.items.length,
    };
  },
  {
    registerDevice,
  }
)(withRouter(PushNotifications));

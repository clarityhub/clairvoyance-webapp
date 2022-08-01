import { Component } from 'react';
import { bind } from 'react-hocs';
import loader from 'clarity/dist/loader';

import { getAll } from '../actions';

/**
 * Lifecycle component for handling loading notifications
 */
class NotificationLifecycle extends Component {
  render() {
    return null;
  }
}

export default bind(
  loader(getAll)(),
)(NotificationLifecycle);

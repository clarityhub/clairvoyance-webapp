import React, {Component} from 'react';
import classnames from 'classnames';
import FaClose from 'react-icons/lib/fa/close';
import Button from 'theme-claire/src/atoms/Button';

import {
  banner,
  bannerText,
  priorityInfo,
  priorityHigh,
  hideBanner,
} from './Banner.scss';

export default class Banner extends Component {
  state = {
    showBanner: Boolean(this.props.messageComponent),
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      showBanner: Boolean(newProps.messageComponent),
    });
  }

  handleHideBanner = (e) => {
    e && e.preventDefault();
    this.setState({
      showBanner: false,
    });
  }

  render() {
    const { priority, messageComponent } = this.props;
    return (
      <div className={classnames(banner, {
        [hideBanner]: !this.state.showBanner,
        [priorityHigh]: priority === 'high',
        [priorityInfo]: priority === 'info',
      })}>
        <div className={bannerText}>
          {messageComponent}
        </div>
        <Button icon onClick={this.handleHideBanner}>
          <FaClose />
        </Button>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';

import RefreshToken from 'js/auth/components/RefreshToken';
import TabContent from 'js/tabs/components/TabContent';
import OpenTabs from 'js/tabs/components/OpenTabs';
import Socket from 'js/socket/components/Socket';
import NotificationLifecycle from 'js/notifications/components/NotificationLifecycle';
import TitleContainer from 'js/window/components/TitleContainer';
import PushNotifications from 'js/window/components/PushNotifications';

import * as trialMessages from '../utilities/bannerMessages';
import { application, columns } from './App.scss';
import Banner from './Banner';
import HeaderTabs from './HeaderTabs';
import Content from './Content';
import LeftSidebar from './LeftSidebar';

class App extends Component {
  render() {
    const { paths, bannerMessage } = this.props;
    return (
      <div className={application}>
        <NotificationLifecycle />
        <RefreshToken />
        <Socket rtcUrl={paths.rtc} />

        <TitleContainer />
        <PushNotifications />

        <Banner
          {...bannerMessage}
        />
        <div className={columns}>
          <LeftSidebar />
          <Content>
            <HeaderTabs>
              <OpenTabs />
            </HeaderTabs>

            <TabContent />
          </Content>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const trialStatus = state.auth.trial;
    const { trialIsExpired, trialDaysLeft, status } = trialStatus;
    let bannerMessage = trialMessages.emptyBanner;
    if (trialIsExpired && status === 'trial') {
      bannerMessage = trialMessages.trialExpired;
    } else if (trialDaysLeft < 3 && status === 'trial') {
      bannerMessage = trialMessages.trialLimited(trialStatus.trialDaysLeft);
    }

    return {
      bannerMessage,
    };
  }
)(App);

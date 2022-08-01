import React from 'react';
import { connect } from 'react-redux';
import FaBarChart from 'react-icons/lib/fa/bar-chart';
import IoChatBubbles from 'react-icons/lib/io/chatbubbles';
import MdCloudQueue from 'react-icons/lib/md/cloud-queue';
import TiGroupOutline from 'react-icons/lib/ti/group-outline';

import { create } from 'js/tabs/actions';
import DashboardTabData from 'js/dashboard/models/DashboardTabData';
import ChatTabData from 'js/chat/models/ChatTabData';
import IntegrationsTabData from 'js/integrations/models/IntegrationsTabData';
import ChatNotificationBubble from 'js/notifications/components/ChatNotificationBubble';
import AccountTabData from 'js/accounts/models/AccountTabData';

import HeaderProfile from './HeaderProfile';
import MyProfileCard from 'js/me/components/MyProfileCard';

import {
  sidebar,
  sidebarList,
  sidebarNotification,
  /* sidebarHeading */
} from './LeftSidebar.scss';

// const noop = () => {};

const LeftSidebar = ({
  handleClickDashboard,
  handleClickChats,
  handleClickApps,
  handleClickUsers,
}) => (
  <div className={sidebar}>
    <HeaderProfile>
      <MyProfileCard />
    </HeaderProfile>
    <ul className={sidebarList}>
      <li>
        <button onClick={handleClickDashboard}>
          <FaBarChart /> <span>Dashboard</span>
        </button>
      </li>
      <li>
        <button onClick={handleClickChats}>
          <ChatNotificationBubble className={sidebarNotification} />
          <IoChatBubbles /> <span>All Chats</span>
        </button>
      </li>
      <li>
        <button onClick={handleClickUsers}>
          <TiGroupOutline /> <span>Users</span>
        </button>
      </li>
      {/* <li>
        <button onClick={noop}>
          <TiContacts /> <span>Contacts</span>
        </button>
      </li> */}
      <li>
        <button onClick={handleClickApps}>
          <MdCloudQueue /> <span>Integrations</span>
        </button>
      </li>
    </ul>

    {/* <h3 className={sidebarHeading}>Inboxes</h3>
    <ul className={sidebarList}>
      <li>
        <button onClick={handleClickApps}>
          <FaDesktop /> <span>Apps</span>
        </button>
      </li>
    </ul> */}
  </div>
);

export default connect(
  () => ({}),
  (dispatch) => ({
    handleClickDashboard: () => dispatch(
      create({
        ...DashboardTabData,
        active: true,
      })
    ),
    handleClickChats: () => dispatch(
      create({
        ...ChatTabData,
        active: true,
      })
    ),
    handleClickApps: () => dispatch(
      create({
        ...IntegrationsTabData,
        active: true,
      })
    ),
    handleClickUsers: () => dispatch(
      create({
        ...AccountTabData,
        active: true,
      })
    ),
  })
)(LeftSidebar);

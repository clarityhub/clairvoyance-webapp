import React from 'react';
import { connect } from 'react-redux';

import { Menu, MenuItem, Divider } from 'theme-claire/src/atoms/Portals';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import { create } from 'js/tabs/actions';
import { logout } from 'js/auth/actions';
import AccountTabData from 'js/accounts/models/AccountTabData';
import { profileMenu } from './ProfileMenu.scss';

const ProfileMenu = ({ handleCreateAccountTab, handleDevelopers, handleLogOut, ...props }) => (
  <Menu className={profileMenu}>
    <MenuItem onClick={handleCreateAccountTab}>
      Account
    </MenuItem>
    <MenuItem onClick={handleDevelopers}>
      Developers
    </MenuItem>
    <Divider />
    <MenuItem onClick={handleLogOut}>
      <FaSignOut /> <span>Logout</span>
    </MenuItem>
  </Menu>
);

export default connect(
  () => ({}),
  (dispatch) => ({
    handleCreateAccountTab: () => dispatch(
      create({
        ...AccountTabData,
        active: true,
      })
    ),
    handleLogOut: () => dispatch(logout()),
    handleDevelopers: () => {
      const win = window.open(`https://developers.${process.env.REACT_APP_BASE_URL}`, '_blank');
      win.focus();
    },
  })
)(ProfileMenu);

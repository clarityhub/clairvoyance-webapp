import React from 'react';
import ModalForm from 'theme-claire/src/molecules/ModalForm';
import Button from 'theme-claire/src/atoms/Button';
import Toolbar from 'theme-claire/src/atoms/Toolbar';
import FaUserPlus from 'react-icons/lib/fa/user-plus';

import UserCreateForm from './UserCreateForm';

export default () => (
  <Toolbar>
    <ModalForm overlay={<UserCreateForm />}>
      <Button small outline><FaUserPlus /> Create User</Button>
    </ModalForm>
  </Toolbar>
);

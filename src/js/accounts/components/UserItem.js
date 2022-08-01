import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import IoEdit from 'react-icons/lib/io/edit';
import IoTrashA from 'react-icons/lib/io/trash-a';
import { Item, ItemColumn } from 'theme-claire/src/atoms/Grid';
import { Tooltip } from 'theme-claire/src/atoms/Portals';
import Button from 'theme-claire/src/atoms/Button';
import ModalForm from 'theme-claire/src/molecules/ModalForm';
import Prompt from 'theme-claire/src/molecules/Prompt';

import AvatarUrl from 'js/profiles/components/AvatarUrl';
import UserStatus from 'js/statuses/components/UserStatus';
import UserUpdateForm from './UserUpdateForm';
import { del } from '../actions/users';

class UserItem extends Component {
  static propTypes = {
    avatarUrl: string,
    email: string,
    handleDelete: func.isRequired,
    name: string,
    uuid: string.isRequired,
  }

  handleDelete = (e) => {
    const { handleDelete, uuid } = this.props;

    e && e.preventDefault();

    this.prompt.prompt({
      text: 'Are you sure want to delete this user?',
      shouldCloseOnOverlayClick: true,
      options: {
        'Delete': {
          buttonProps: {
            danger: true,
          },
          onClick: (e) => {
            return handleDelete(uuid);
          },
        },
        'Cancel': {},
      },
    });
  }

  render() {
    const { avatarUrl, uuid, email, name } = this.props;

    return (
      <Item>
        <ItemColumn width="60px">
          <AvatarUrl small url={avatarUrl} />
          <UserStatus withAvatar uuid={uuid} />
        </ItemColumn>
        <ItemColumn flex={1}>
          <p>{name}</p>
        </ItemColumn>
        <ItemColumn flex={1}>
          <p>{email}</p>
        </ItemColumn>
        <ItemColumn actions width="120px">
          <Tooltip
            overlay={<span>Delete</span>}
          >
            <Button onClick={this.handleDelete} icon><IoTrashA /></Button>
          </Tooltip>
          <Tooltip
            overlay={<span>Edit</span>}
          >
            <ModalForm overlay={<UserUpdateForm uuid={uuid} name={name} email={email} />}>
              <Button onClick={this.handleEdit} icon><IoEdit /></Button>
            </ModalForm>
          </Tooltip>
        </ItemColumn>

        <Prompt ref={r => (this.prompt = r)} />
      </Item>
    );
  }
}

export default connect(
  () => ({}),
  {
    handleDelete: del,
  }
)(UserItem);

import React, { Component } from 'react';
import { string, func } from 'prop-types';

import IoTrashA from 'react-icons/lib/io/trash-a';
import Button from 'theme-claire/src/atoms/Button';
import Prompt from 'theme-claire/src/molecules/Prompt';
import Card from 'theme-claire/src/atoms/Card';

import { iconButton } from './SettingsIntegration.scss';

export default class RevokeIntegration extends Component {
  static propTypes = {
    onDelete: func.isRequired,
    uuid: string.isRequired,
  }

  state = {
    isDirty: false,
    showModal: null,
  }

  handleDelete = (e) => {
    const { onDelete, uuid } = this.props;

    e && e.preventDefault();

    this.prompt.prompt({
      text: 'Are you sure you want to revoke this integration?',
      shouldCloseOnOverlayClick: true,
      options: {
        'Revoke': {
          buttonProps: {
            danger: true,
          },
          onClick: (e) => {
            return onDelete(uuid);
          },
        },
        'Cancel': {},
      },
    });
  }

  render() {
    return (
      <Card>
        <h2>Revoke Integration</h2>

        <Button onClick={this.handleDelete} danger className={iconButton}>
          <IoTrashA /> <span>Revoke</span>
        </Button>

        <Prompt ref={r => (this.prompt = r)} />
      </Card>
    );
  }
}

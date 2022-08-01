import React from 'react';
import { connect } from 'react-redux';
import Button from 'theme-claire/src/atoms/Button';

import { join } from '../../actions';

const onClick = (handleJoin, uuid) => (e) => {
  e.preventDefault();
  handleJoin(uuid);
};

const ChatRoomJoin = ({ handleJoin, uuid }) => (
  <Button primary onClick={onClick(handleJoin, uuid)}>Join</Button>
);

export default connect(
  () => ({}),
  { handleJoin: join }
)(ChatRoomJoin);

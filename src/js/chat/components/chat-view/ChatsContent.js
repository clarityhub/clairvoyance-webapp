import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { branch, renderComponent } from 'recompose';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';
import { create } from 'js/tabs/actions';
import Loading from 'theme-claire/src/atoms/Loading';
import Card from 'theme-claire/src/atoms/Card';

import { getAll } from '../../actions';
import ChatsList from './ChatsList';
import ChatRoomTabData from '../../models/ChatRoomTabData';

const ChatsContent = ({ chats, handleClick }) => (
  <ChatsList chats={chats} onClick={handleClick} />
);

const EmptyChatsContent = ({ uiStatusFilter }) => (
  <Card>
    <p style={{ textAlign: 'center' }}>
      There are no {uiStatusFilter} chats right now.
    </p>
  </Card>
);

const enhanceLoading = branch(
  props => props.state === FETCHING && (!props.chats || props.chats.length === 0),
  renderComponent(Loading),
);

const enhanceEmpty = branch(
  props => !(props.chats && props.chats.length > 0),
  renderComponent(EmptyChatsContent),
);

export default bind(
  loader(getAll)(),
  connect(
    state => ({
      state: state.chats.state,
      uiStatusFilter: state.chats.uiStatusFilter,
      chats: Object.values(state.chats.items)
        .filter(v => v.status === state.chats.uiStatusFilter)
        .filter(v => !v.deleted)
        .sort((a, b) => {
          return a.createdAt > b.createdAt ? -1 : 1;
        }),
    }),
    dispatch => ({
      handleClick: (uuid) => (e) => {
        e && e.preventDefault();

        dispatch(
          create({
            ...ChatRoomTabData,
            active: true,
            params: {
              uuid,
            },
          })
        );
      },
    })
  ),
)(enhanceLoading(enhanceEmpty(ChatsContent)));

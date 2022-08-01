import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { branch, renderComponent } from 'recompose';
import deepEqual from 'deep-equal';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';
import Loading from 'theme-claire/src/atoms/Loading';
import MessageGroupsContent from './MessageGroupsContent';
import { getPage } from '../../actions/messages';

class MessageGroups extends Component {
  static propTypes = {
    chatUuid: string,
    isSelfParticipant: bool,
    onUpdateFormText: func.isRequired,
    participant: shape({
      name: string,
    }),
  }

  state = {
    groups: [],
  }

  isAtBottom = true;

  componentDidMount() {
    this.createGroups(this.props.messages);
    setTimeout(
      () => this.maybeScrollToBottom(true),
      0
    );

    this.container.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const height = this.container.clientHeight;
    this.isAtBottom = this.container.scrollTop + this.container.scrollHeight >= height;
  }

  componentWillReceiveProps(newProps) {
    if (!deepEqual(newProps.messages, this.props.messages)) {
      this.createGroups(newProps.messages);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.maybeScrollToBottom();
    }
  }

  createGroups = (messages) => {
    const groups = [];

    let currentParticipantUuid = 0;

    messages.forEach((message) => {
      if (message.participantId === '-1') {
        message.participant = {
          uuid: '-1',
          realType: 'system',
        };
        message.system = true;
      }
      if (message.participant.uuid !== currentParticipantUuid) {
        // Create a new group
        groups.push({
          messages: [],
          participant: message.participant,
        });
        currentParticipantUuid = message.participant.uuid;
      }

      groups[groups.length - 1].messages.push(message);
    });

    this.setState({
      groups,
    });
  }

  maybeScrollToBottom = (force = false) => {
    if (!this.container) {
      return;
    }

    if (force || this.isAtBottom) {
      this.container.scrollTop = this.container.scrollHeight;
      this.isAtBottom = true;
    }
  }

  render() {
    return (
      <MessageGroupsContent
        withRef={r => { this.container = r; }}
        withSuggestionRef={r => { this.suggestions = r; }}
        maybeScrollToBottom={this.maybeScrollToBottom}
        {...this.props}
        {...this.state}
      />
    );
  }
}

const enhanceLoading = branch(
  props => props.state === FETCHING && props.messages.length === 0,
  renderComponent(Loading)
);

const annotate = (messages, participants, me) => {
  // Add the participant to the messages
  // Add if the participant is self
  return messages.map((message) => {
    const participant = participants[message.participantId];

    const isSelf = participant && participant.realType === 'user' && participant.realUuid === me.uuid;

    // message.participant = participant || {};
    // message.participant.isSelf = isSelf;

    return {
      ...message,
      participant: {
        ...(participant || {}),
        isSelf,
      },
    };
  });
};

export default bind(
  loader(getPage, ({ chatUuid }) => ([ chatUuid ]))(),
  connect(
    (state, props) => {
      let messages = [];
      if (state.chats.items[props.chatUuid]) {
        messages = annotate(
          state.messages.items[props.chatUuid] || [],
          state.participants.items,
          state.me,
        );
      }

      return {
        messages,
        state: state.messages.state,
      };
    }
  )
)(enhanceLoading(MessageGroups));

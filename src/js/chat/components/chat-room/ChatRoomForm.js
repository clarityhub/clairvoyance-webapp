import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import debounce from 'debounce';
import GoPencil from 'react-icons/lib/go/pencil';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o';
import Textarea from 'theme-claire/src/atoms/Textarea';
import { emitEvent } from 'js/socket/socket/handler';

import { update } from '../../actions';
import { create, compose } from '../../actions/messages';
import ChatRoomJoin from './ChatRoomJoin';
import {
  formContainer,
  form as formStyle,
  formJoin,
  formTextArea,
  formSend,
  formAction,
} from './ChatRoomForm.scss';
import {
  CLOSED,
} from '../../constants/roomStatuses';

const TIMER = 10000;
let timer;

const stopTyping = (myUuid, uuid) => {
  clearTimeout(timer);
  debouncedEmit.clear();
  emitEvent({
    name: 'chat-participant.typing-end',
    data: {
      event: 'chat-participant.typing-end',
      ts: +new Date(),
      meta: {
        participantUuid: myUuid,
        uuid,
      },
    },
  });
};

const debouncedEmit = debounce(emitEvent, TIMER, true);

const startTyping = (myUuid, uuid) => {
  clearTimeout(timer);
  debouncedEmit({
    name: 'chat-participant.typing',
    data: {
      event: 'chat-participant.typing',
      ts: +new Date(),
      meta: {
        uuid,
        participantUuid: myUuid,
      },
    },
  });
  timer = setTimeout(stopTyping.bind(this, myUuid, uuid), TIMER);
};

class ChatRoomForm extends Component {
  static propTypes = {
    compose: func.isRequired,
    composeText: string,
    handleCreate: func.isRequired,
    handleUpdate: func.isRequired,
    isOpen: bool,
    isSelfParticipant: bool,
    myUuid: string.isRequired,
    uuid: string.isRequired,
  }

  state = {
    text: '',
  }

  componentWillMount() {
    if (this.props.composeText) {
      this.setState({
        text: this.props.composeText,
      });
    }
  }

  componentWillUnmount() {
    const { compose, uuid } = this.props;

    compose({
      chatUuid: uuid,
      text: this.state.text,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.composeText !== this.props.composeText) {
      this.setState({
        text: nextProps.composeText,
      });
    }
  }

  handleSubmit = (e) => {
    e && e.preventDefault();

    const { handleCreate, uuid, myUuid } = this.props;

    if (this.text.value.trim() === '') {
      this.text.value = '';
      return;
    }

    handleCreate(uuid, this.text.value);
    stopTyping(myUuid, uuid);

    this.setState({
      text: '',
    });

    this.text.value = '';
  }

  handleResolve = (e) => {
    e && e.preventDefault();

    const { handleUpdate, uuid } = this.props;

    handleUpdate(uuid, {
      status: CLOSED,
    });
  }

  handleChange = (e) => {
    const { uuid, myUuid } = this.props;

    if (!window.touch && e.keyCode === 13 && !e.shiftKey) {
      return this.handleSubmit();
    }
    if (this.state.text && e.target.value === '') {
      stopTyping(myUuid, uuid);
    } else if (e.target.value !== '') {
      startTyping(myUuid, uuid);
    }
    this.setState({text: e.target.value});
  }

  handleKeyDown = (e) => {
    if (!window.touch && e.keyCode === 13 && !e.shiftKey) {
      e && e.preventDefault();
    }
  }

  render() {
    const { isOpen, isSelfParticipant } = this.props;
    const { text } = this.state;

    if (!isSelfParticipant) {
      return (
        <div className={classnames(formContainer, formJoin)}>
          <ChatRoomJoin {...this.props} />

          <p>Join this chat in order to send a message</p>
        </div>
      );
    }

    return (
      <div className={formContainer}>
        <form className={formStyle} onSubmit={this.handleSubmit}>
          <Textarea
            className={formTextArea}
            textareaRef={r => { this.text = r; }}
            onKeyUp={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={text}
            name="message"
          />
          <div>
            {
              isOpen
                ? <button
                  className={formAction}
                  onClick={this.handleResolve}
                >
                  <FaCheckCircleO /> Resolve
                </button>
                : <span>Resolved!</span>
            }
            <button type="submit" className={formSend}>
              <span>Send</span>
              <span><GoPencil /></span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// No recompose here since we need the ref to ChatRoomForm
export default connect(
  (state, props) => {
    const participants = state.chats.items[props.uuid].participants;

    const myParticipant = participants
      .map(pid => state.participants.items[pid])
      .find(p => p.realType === 'user' && p.realUuid === state.me.uuid) ||
      {
        uuid: '-1',
      };

    return {
      myUuid: myParticipant.uuid,
      composeText: state.messages.composed[props.uuid],
    };
  },
  {
    compose,
    handleCreate: create,
    handleUpdate: update,
  },
  null,
  { withRef: true }
)(ChatRoomForm);

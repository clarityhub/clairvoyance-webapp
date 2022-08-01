import React from 'react';
import deepEqual from 'deep-equal';
import { bind } from 'react-hocs';
import { connect } from 'react-redux';
import { branch, renderNothing, lifecycle } from 'recompose';
import loader from 'clarity/dist/loader';

import { get, chooseAction } from '../actions';
import { insertNames } from '../utilities/replaceNames';

import Suggestion from './Suggestion';
import { suggestionsContainer, suggestions as suggestionsClass } from './Suggestions.scss';

/**
 * @param participant
 * @param messageUuid
 * @param maybeScrollToBottom
 */
const SuggestionsContainer = ({
  suggestions,
  chooseAction,
}) => (
  <div className={suggestionsContainer}>
    <span>Suggestions</span>
    <div className={suggestionsClass}>
      {suggestions.map((s, i) => (
        <Suggestion
          key={i}
          suggestion={s}
          onChoose={chooseAction}
        />
      ))}
    </div>
  </div>
);

const enhanceNothing = branch(
  ({ suggestions }) => (suggestions.length === 0),
  renderNothing
);

const enhanceScrollBottom = lifecycle({
  componentDidMount() {
    setTimeout(() => this.props.maybeScrollToBottom(), 0);
  },

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.suggestions, prevProps.suggestions)) {
      setTimeout(() => this.props.maybeScrollToBottom(), 0);
    }
  },
});

export default bind(
  loader(get, ({ messageUuid }) => ([messageUuid]))(),
  connect(
    (state, { messageUuid, participant }) => ({
      suggestions: (state.suggestions.items[messageUuid] || []).map((s) => {
        return {
          ...s,
          text: insertNames(participant.name, s.text),
        };
      }),
    }),
    {
      chooseAction,
    }
  )
)(enhanceNothing(enhanceScrollBottom(SuggestionsContainer)));

import React from 'react';
import { Tooltip } from 'theme-claire/src/atoms/Portals';
import Button from 'theme-claire/src/atoms/Button';
import Loading from 'theme-claire/src/atoms/Loading';
import { compose, withState, withHandlers, branch, renderComponent } from 'recompose';

import {
  container,
  actions,
  message,
  tooltip,
} from './Suggestion.scss';

const withLoader = compose(
  withState('isLoading', 'loading', false),
  withHandlers({
    load: ({ loading }) => (e) => {
      loading(true);

      setTimeout(() => {
        loading(false);
      }, 10000);
    },
  })
);

const enhanceLoading = branch(
  ({ isLoading }) => isLoading,
  renderComponent(Loading),
);

const onClick = (suggestion, action, cb, load) => (e) => {
  e.preventDefault();
  cb(suggestion.uuid, action.value);
  load();
};

const ActionButton = withLoader(enhanceLoading(({ suggestion, action, onChoose, load }) => (
  <Button onClick={onClick(suggestion, action, onChoose, load)} icon>
    <i className={`fa fa-${action.icon || 'circle'}`} />
  </Button>
)));

export default ({ suggestion, onChoose }) => (
  <div className={container}>
    <span className={message}>
      {suggestion.text}
    </span>

    <div className={actions}>
      {
        suggestion.actions.map((a) => {
          return (
            <Tooltip
              className={tooltip}
              key={suggestion.uuid + a.name}
              overlay={<span>{a.name}</span>}
            >
              <ActionButton suggestion={suggestion} action={a} onChoose={onChoose} />
            </Tooltip>
          );
        })
      }
    </div>
  </div>
);

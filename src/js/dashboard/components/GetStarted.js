import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import loader from 'clarity/dist/loader';
import { FETCHING } from 'clarity/dist/constants/state';
import { branch, renderComponent } from 'recompose';

import Loading from 'theme-claire/src/atoms/Loading';
import FaClose from 'react-icons/lib/fa/close';
import Button from 'theme-claire/src/atoms/Button';
import Copy from 'theme-claire/src/atoms/Copy';

import { updateMeta } from 'js/me/actions';
import { create } from 'js/tabs/actions';
import AccountTabData from 'js/accounts/models/AccountTabData';
import IntegrationsTabData from 'js/integrations/models/IntegrationsTabData';
import { get } from 'js/integrations/actions/settings';

import {
  container,
  listItem,
  websiteCode,
  closeButton,
  link,
} from './GetStarted.scss';

const GetStarted = ({
  handleClickApps,
  handleClickAccount,
  handleDismissCard,
  settings,
}) => {
  return (
    <div className={container}>
      <Button className={closeButton} icon onClick={handleDismissCard}><FaClose /></Button>
      <p>
        Hey there! Welcome to Clarity Hub. Here are some tips to get started:
      </p>
      <ol>
        <li className={listItem}>
          Add the following script to your website: <br />
          <pre className={websiteCode}>
            { settings ? settings.settings[1].value : <Loading />}
          </pre>
          {settings ? <Copy text={settings.settings[1].value} /> : null}
        </li>
        <li className={listItem}>Try out the website chat</li>
        <li className={listItem}><a className={link} onClick={handleClickAccount}>Invite your team members</a></li>
      </ol>
    </div>
  );
};

const enhance = branch(
  (props) => props.state === FETCHING,
  renderComponent(Loading)
);

export default bind(
  loader(get, ({ uuid }) => ([uuid]))(),
  connect(
    (state, props) => ({
      state: state.integrations.state,
      settings: state.integrations.settings[props.uuid],
    }),
    (dispatch) => ({
      handleClickApps: () => dispatch(
        create({
          ...IntegrationsTabData,
          active: true,
        })
      ),
      handleClickAccount: () => dispatch(
        create({
          ...AccountTabData,
          active: true,
        })
      ),
      handleDismissCard: () => {
        dispatch(
          updateMeta({ getStartedDismissed: true })
        );
      },
    })
  ))(enhance(GetStarted));

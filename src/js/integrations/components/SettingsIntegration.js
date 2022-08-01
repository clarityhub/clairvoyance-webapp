import React, { Component } from 'react';
import { arrayOf, shape } from 'prop-types';
import Card from 'theme-claire/src/atoms/Card';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import loader from 'clarity/dist/loader';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Copy from 'theme-claire/src/atoms/Copy';
import Input from 'theme-claire/src/atoms/Input';
import Textarea from 'theme-claire/src/atoms/Textarea';
import { branch, renderNothing } from 'recompose';
import { formGroup } from './SettingsIntegration.scss';

import { get } from '../actions/settings';

class Settings extends Component {
  static propTypes = {
    settings: arrayOf(shape({

    })),
  }

  handleSubmit = (e) => {
    e && e.preventDefault();
    // TODO
  }

  renderSetting = (setting) => {
    let entry = '';

    // TODO handle clipboard setting

    switch (setting.type) {
      case 'input':
        entry = (
          <Input
            type="text"
            label={setting.label}
            placeholder={setting.placeholder}
            defaultValue={setting.value}
            disabled={setting.disabled}
          />
        );
        break;
      case 'textarea':
        entry = (
          <Textarea
            type="text"
            label={setting.label}
            placeholder={setting.placeholder}
            defaultValue={setting.value}
            disabled={setting.disabled}
            textareaRef={() => {}}
          />
        );
        break;
      case 'text':
      default:
        entry = (<p>{setting.value}</p>);
    }

    return (
      <FormGroup className={formGroup}>
        {entry}
        { setting.type === 'textarea' ? <Copy text={setting.value} /> : null}
      </FormGroup>
    );
  }

  render() {
    const { settings } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {settings.map((setting) => this.renderSetting(setting))}
      </form>
    );
  }
}

const SettingsIntegration = ({ settings, state }) => (
  <Card>
    <h2>Settings</h2>

    <Settings settings={settings.settings} />
  </Card>
);

const exists = (settings) => (
  settings &&
  settings.settings
);

const enhanceNotFound = branch(
  ({ settings, state }) => !exists(settings),
  renderNothing
);

export default bind(
  loader(get, ({ uuid }) => ([uuid]))(),
  connect(
    (state, props) => ({
      state: state.integrations.state,
      settings: state.integrations.settings[props.uuid],
    })
  )
)(enhanceNotFound(SettingsIntegration));

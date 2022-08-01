import React from 'react';
import { Link } from 'react-router-dom';
import View from 'theme-claire/src/atoms/Scaffolding/View';
import Button from 'theme-claire/src/atoms/Button';
import IntegrationsContent from './IntegrationsContent';

export default ({ handleClick }) => (
  <View>
    <h2>Your Integrations</h2>
    <Link to="/integrations/search">
      <Button primary>Search for New Integrations</Button>
    </Link>
    <IntegrationsContent onClick={handleClick} />
  </View>
);

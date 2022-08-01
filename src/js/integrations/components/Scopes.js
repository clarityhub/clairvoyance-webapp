import React from 'react';
import { scopes as scopesUl } from './Scopes.scss';

const readableScopes = (scopes) => {
  return scopes.split(',');
};

export default ({ scopes }) => (
  <ul className={scopesUl}>
    {
      readableScopes(scopes).map((s, i) => (
        <li key={i}>{s}</li>
      ))
    }
  </ul>
);

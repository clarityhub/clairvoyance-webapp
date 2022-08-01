import React from 'react';
import { Redirect } from 'react-router-dom';

export default () => (
  <Redirect to={`${process.env.REACT_APP_WWW_URL}/register`} />
);

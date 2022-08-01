import {
  READ_CREDENTIAL,
  READ_CLIENT_CREDENTIALS,
  READ,
  READ_AUTHORIZATIONS,
  CREATE_CODE,
  READ_ALL,
  DISABLE,
} from '../constants';
import clarity from 'clarity/dist';

export const getCredentialsByClient = (clientId) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.api}/auth/credentials/client/${clientId}`, {}, READ_CLIENT_CREDENTIALS);
  };
};

export const getCredential = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.api}/auth/credentials/${uuid}`, {}, READ_CREDENTIAL);
  };
};

export const getIntegration = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.api}/integrations/${uuid}`, {}, READ);
  };
};

export const getAuthorizations = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({
        uuid,
      })
      .get(`${paths.api}/auth/authorizations/${uuid}`, {}, READ_AUTHORIZATIONS);
  };
};

export const createCode = (payload) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .post(`${paths.api}/auth/credentials/code`, payload, CREATE_CODE);
  };
};

export const getAllIntegrations = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.api}/integrations/active`, {}, READ_ALL);
  };
};

export const disable = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({ uuid })
      .delete(`${paths.api}/auth/credentials/${uuid}`, {}, DISABLE);
  };
};

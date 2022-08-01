import * as TAB from '../constants';

export const create = ({ active, title, Type, params, typeName }) => {
  return {
    type: TAB.CREATE,
    data: {
      active,
      title,
      Type,
      params,
      typeName,
    },
  };
};

export const update = (uuid, data) => {
  return {
    type: TAB.UPDATE,
    uuid,
    data,
  };
};

export const setActive = (uuid) => {
  return {
    type: TAB.ACTIVE,
    uuid,
  };
};

export const remove = (uuid) => {
  return {
    type: TAB.REMOVE,
    uuid,
  };
};

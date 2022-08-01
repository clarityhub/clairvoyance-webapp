import {
  READ,
  READ_ALL,
  CREATE,
  UPDATE,
  DELETE,
} from '../constants/users';
import clarity from 'clarity/dist';

const transformOrAppend = (arr, match, transform) => {
  let found = false;
  const newArr = arr.map((item) => {
    if (match(item)) {
      // Found the item
      found = true;

      return transform(item);
    }
    return item;
  });

  if (!found) {
    newArr.push(transform({}));
  }

  return newArr;
};

export default clarity
  .listen([
    READ_ALL,
    READ,
    CREATE,
    UPDATE,
    DELETE,
  ])
  .initial({
    items: [],
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ_ALL:
        return {
          items: action.payload.users,
        };
      case CREATE:
        return {
          items: [...state.items, action.payload],
        };
      case READ:
      case UPDATE:
        return {
          items: transformOrAppend(
            state.items,
            (u) => {
              return u.uuid === action.payload.uuid;
            },
            (u) => {
              return { ...u, ...action.payload };
            }),
        };
      case DELETE:
        return {
          items: state.items.filter((u) => {
            return u.uuid !== action.uuid;
          }),
        };
      default:
        return {};
    }
  });

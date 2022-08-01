import React from 'react';
import { Item, ItemColumn } from 'theme-claire/src/atoms/Grid';

import {
  item,
  itemName,
  itemText,
  itemMessage,
} from './IntegrationsItem.scss';

export default ({ uuid, name, shortDescription, onClick }) => (
  <Item className={item} clickable>
    <button onClick={onClick(uuid)}>
      <ItemColumn flex={1} className={itemText}>
        <div className={itemMessage}>
          <span>{name}</span>
        </div>
        <div className={itemName}>
          <span>{shortDescription}</span>
        </div>
      </ItemColumn>
    </button>
  </Item>
);

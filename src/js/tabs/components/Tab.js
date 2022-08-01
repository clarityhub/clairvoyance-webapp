import React from 'react';
import classnames from 'classnames';
import IoClose from 'react-icons/lib/io/close';
import { tab, tabActive, tabClose, tabCloseActive, tabContainer } from './Tab.scss';

const noop = () => {};

export default ({
  title,
  uuid,
  params,
  active,
  onSelect,
  onClose,
  widthMultiplier,
}) => (
  <div className={tabContainer}>
    <button
      className={classnames(tab, { [tabActive]: active })}
      onClick={!active ? onSelect(uuid) : noop}
      style={{
        width: (active ? 1 : widthMultiplier || 1) * 150,
      }}
    >
      <span>
        {typeof title === 'function' ? title(params) : title}
      </span>
    </button>
    <button
      className={classnames(tabClose, { [tabCloseActive]: active })}
      onClick={onClose(uuid)}
    >
      <IoClose />
    </button>
  </div>
);

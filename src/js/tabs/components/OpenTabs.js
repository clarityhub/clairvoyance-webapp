import React from 'react';
import { connect } from 'react-redux';
import { setActive, remove } from '../actions';
import Tab from './Tab';
import { container, openTabs } from './OpenTabs.scss';

const TAB_SIZE = 150;

const tabWidthMultiplier = (count) => {
  const max = 1;
  const min = 0.7;

  if (count > 4) {
    return Math.max(min, 1.2 - 0.05 * count);
  } else {
    return max;
  }
};

const OpenTabs = ({
  handleClose,
  handleSelect,
  tabs,
}) => {
  const widthMultiplier = tabWidthMultiplier(tabs.length);
  return (
    <div className={container}>
      <div
        className={openTabs}
        style={{
          width: (tabs.length - 1) * TAB_SIZE * widthMultiplier + 2 * TAB_SIZE,
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.uuid}
            {...tab}
            onSelect={handleSelect}
            onClose={handleClose}
            params={tab.params}
            widthMultiplier={widthMultiplier}
          />
        ))}
      </div>
    </div>
  );
};

// Connect to store
export default connect(
  (state) => ({ tabs: state.tabs }),
  (dispatch) => ({
    handleSelect: (uuid) => (e) => {
      e && e.preventDefault();
      e && e.stopPropagation();
      dispatch(setActive(uuid));
    },
    handleClose: (uuid) => (e) => {
      e && e.preventDefault();
      e && e.stopPropagation();
      dispatch(remove(uuid));
    },
  })
)(OpenTabs);

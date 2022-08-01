import * as TAB from '../constants';
import Tab from '../models/Tab';
import DashboardTabData from '../../dashboard/models/DashboardTabData';
import deepEqual from 'deep-equal';

export default (tabs = [
  new Tab({
    ...DashboardTabData,
    active: true,
  }),
], action) => {
  switch (action.type) {
    // {
    //   type,
    //   data: {
    //     title,
    //     active,
    //   }
    // }
    case TAB.CREATE: {
      // Check if there is already a tab that is exactly
      // the same (but with a different uuid)
      const sameTab = tabs.findIndex(t => {
        return deepEqual(t.params, action.data.params) &&
          t.typeName === action.data.typeName;
      });

      if (sameTab !== -1 && action.data.active) {
        // Mark that tab as active (if data.active)
        return tabs.map((tab, i) => {
          if (i === sameTab) {
            return new Tab(action.data);
          }

          tab.active = false;

          return new Tab(tab);
        });
      } else {
        let constNewTabs = tabs;

        if (action.data.active) {
          constNewTabs = tabs.map((tab) => {
            tab.active = false;

            return new Tab(tab);
          });
        }

        return [new Tab(action.data), ...constNewTabs];
      }
    }

    // {
    //   type,
    //   uuid,
    //   data: {
    //     title,
    //   }
    // }
    case TAB.UPDATE:
      return tabs.map((tab) => {
        if (tab.uuid === action.uuid) {
          // Merge old tab and new tab
          // keeps the old UUID, so no funny business
          return new Tab({
            ...tab,
            ...action.data,
          });
        }

        return tab;
      });

    // {
    //   type,
    //   uuid
    // }
    case TAB.ACTIVE:
      return tabs.map((tab) => {
        if (tab.uuid === action.uuid) {
          tab.active = true;
        } else {
          tab.active = false;
        }

        return new Tab(tab);
      });

    // {
    //   type,
    //   uuid
    // }
    case TAB.REMOVE: {
      let activeIndex = -1;

      const tempTabs = tabs.filter((tab, i) => {
        if (tab.uuid === action.uuid) {
          activeIndex = i;
          return false;
        }
        return true;
      });

      if (tempTabs.length > 0) {
        if (activeIndex >= tempTabs.length) {
          activeIndex = tempTabs.length - 1;
        }
      }

      return tempTabs.map((tab, i) => {
        if (i === activeIndex) {
          tab.active = true;
        } else {
          tab.active = false;
        }

        return new Tab(tab);
      });
    }

    default:
      return tabs;
  }
};

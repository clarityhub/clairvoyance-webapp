import TabRegistry from 'js/tabs/models/TabRegistry';

import View from '../components/AccountView';

export default TabRegistry.create({
  title: 'Account Settings',
  params: {},
  Type: View,
  typeName: 'Account',
});

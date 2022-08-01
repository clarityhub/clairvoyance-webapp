import TabRegistry from 'js/tabs/models/TabRegistry';

import Dashboard from '../components/Dashboard';

export default TabRegistry.create({
  title: 'Your Dashboard',
  params: {},
  Type: Dashboard,
  typeName: 'Dashboard',
});

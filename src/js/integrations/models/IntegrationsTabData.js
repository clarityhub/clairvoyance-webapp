import TabRegistry from 'js/tabs/models/TabRegistry';

import IntegrationsView from '../components/IntegrationsView';

export default TabRegistry.create({
  title: 'Your Integrations',
  Type: IntegrationsView,
  params: {},
  typeName: 'Integrations',
});

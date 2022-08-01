import TabRegistry from 'js/tabs/models/TabRegistry';
import IntegrationTitle from '../components/IntegrationTitle';
import IntegrationView from '../components/IntegrationView';

export default TabRegistry.create({
  title: IntegrationTitle,
  Type: IntegrationView,
  params: {},
  typeName: 'Integration',
});

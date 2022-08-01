import TabRegistry from 'js/tabs/models/TabRegistry';
import ChatTitle from '../components/chat-view/ChatTitle';
import View from '../components/chat-view/ChatsView';

export default TabRegistry.create({
  title: ChatTitle,
  params: {},
  Type: View,
  typeName: 'Chat',
});

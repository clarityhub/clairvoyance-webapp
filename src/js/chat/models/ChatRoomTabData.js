import TabRegistry from 'js/tabs/models/TabRegistry';

import ChatRoomTitle from '../components/chat-room/ChatRoomTitle';
import ChatRoomView from '../components/chat-room/ChatRoomView';

export default TabRegistry.create({
  title: ChatRoomTitle,
  Type: ChatRoomView,
  typeName: 'ChatRoom',
});

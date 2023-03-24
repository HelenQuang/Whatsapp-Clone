import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from '@/contexts/ConversationsProvider';

const MainScreen = () => {
  const { selectedConversation } = useConversations();

  return (
    <>
      <Sidebar />
      {selectedConversation && <OpenConversation />}
    </>
  );
};

export default MainScreen;

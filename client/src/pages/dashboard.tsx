import { ContactsProvider } from '@/contexts/ContactsProvider';
import { ConversationsProvider } from '@/contexts/ConversationsProvider';
import { SocketProvider } from '@/contexts/SocketProvider';
import MainScreen from '@/components/MainScreen';

const Dashboard = () => {
  return (
    <SocketProvider>
      <ContactsProvider>
        <ConversationsProvider>
          <div className='d-flex' style={{ height: '100vh' }}>
            <MainScreen />
          </div>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
};

export default Dashboard;

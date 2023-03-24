import { ContactsProvider } from '@/contexts/ContactsProvider';
import { ConversationsProvider } from '@/contexts/ConversationsProvider';
import MainScreen from '@/components/MainScreen';

const Dashboard = () => {
  return (
    <ContactsProvider>
      <ConversationsProvider>
        <div className='d-flex' style={{ height: '100vh' }}>
          <MainScreen />
        </div>
      </ConversationsProvider>
    </ContactsProvider>
  );
};

export default Dashboard;

import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Conversations from './Conversations';
import Contacts from './Contacts';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';

const Sidebar = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('conversations');
  const [whatsappID, setWhatsappID] = useState<string | null>(null);
  const conversationsOpen = activeKey === 'conversations';

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('whatsapp-id');
      setWhatsappID(data);
    }
  }, []);

  return (
    <div style={{ width: '300px' }} className='d-flex flex-column mt-2'>
      <Tab.Container activeKey={activeKey}>
        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setActiveKey('conversations');
              }}
            >
              Conversations
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setActiveKey('contacts');
              }}
            >
              Contacts
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className='border-end overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={'conversations'}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={'contacts'}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>

        <div className='p-2 border-top border-right small'>
          Your ID: <span className='text-muted'>{whatsappID}</span>
        </div>

        <Button onClick={() => setModalOpen(true)} className='rounded-0'>
          New {conversationsOpen ? 'Conversation' : 'Contact'}
        </Button>
      </Tab.Container>

      <Modal
        show={modalOpen}
        onHide={() => {
          setModalOpen(false);
        }}
      >
        {conversationsOpen ? (
          <NewConversationModal
            closeModal={() => {
              setModalOpen(false);
            }}
          />
        ) : (
          <NewContactModal
            closeModal={() => {
              setModalOpen(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;

import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '@/contexts/ContactsProvider';
import { useConversations } from '@/contexts/ConversationsProvider';
import { useState } from 'react';

interface NewConversationModalProps {
  closeModal: () => void;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
  closeModal,
}) => {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const [selectedContactIDs, setSelectedContactIDs] = useState<string[]>([]);

  const handleCheckboxChange = (contactID: string) => {
    setSelectedContactIDs((prevSelectedContactIDs) => {
      if (prevSelectedContactIDs.includes(contactID)) {
        return prevSelectedContactIDs.filter((prevID) => {
          return contactID !== prevID;
        });
      } else {
        return [...prevSelectedContactIDs, contactID];
      }
    });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    createConversation(selectedContactIDs);
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.ID} key={contact.ID}>
              <Form.Check
                type='checkbox'
                // value={selectedContactIDs.includes(contact.ID)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.ID)}
              />
            </Form.Group>
          ))}
          <Button type='submit' className='mt-3'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;

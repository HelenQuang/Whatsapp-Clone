import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useContext } from 'react';
import { useContacts } from '@/contexts/ContactsProvider';

interface NewContactModalProps {
  closeModal: () => void;
}

const NewContactModal: React.FC<NewContactModalProps> = ({ closeModal }) => {
  const IDRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { createContact } = useContacts();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    const ID = IDRef.current?.value;
    const name = nameRef.current?.value;
    createContact(ID as string, name as string);
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>ID:</Form.Label>
            <Form.Control type='text' ref={IDRef} required />
          </Form.Group>
          <Form.Group className='mt-4'>
            <Form.Label>Name:</Form.Label>
            <Form.Control type='text' ref={nameRef} required />
          </Form.Group>
          <Button className='mt-3' type='submit'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactModal;

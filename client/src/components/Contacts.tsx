import { ListGroup } from 'react-bootstrap';
import { useContacts } from '@/contexts/ContactsProvider';

const Contacts = () => {
  const { contacts } = useContacts();

  return (
    <ListGroup variant='flush'>
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.ID}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Contacts;

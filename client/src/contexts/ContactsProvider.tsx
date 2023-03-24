import { useContext, createContext, useState } from 'react';

interface Contact {
  ID: string;
  name: string;
}

interface ContactsContextValue {
  contacts: Contact[];
  createContact: (ID: string, name: string) => void;
}

export const ContactsContext = createContext<ContactsContextValue | undefined>(
  undefined
);

export const useContacts = (): ContactsContextValue => {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }

  return context;
};

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const createContact = (ID: string, name: string) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { ID, name }];
    });
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

import { useContext, createContext, useState, useEffect } from 'react';
import { useContacts } from './ContactsProvider';

interface Conversations {
  recipients: string[];
  messages: { sender: string; text: string }[];
}

interface FormattedConversations {
  recipients: { ID: string; name: string }[];
  messages: { senderName: string; fromMe: boolean; text: string }[];
  selected: boolean;
}

interface ConversationsContextValue {
  conversations: FormattedConversations[];
  createConversation: (recipients: string[]) => void;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedConversation: FormattedConversations;
  sendMessage: (recipients: string[], text: string) => void;
}

export const ConversationsContext = createContext<
  ConversationsContextValue | undefined
>(undefined);

export const useConversations = (): ConversationsContextValue => {
  const context = useContext(ConversationsContext);

  if (!context) {
    throw new Error(
      'useConversations must be used within a ConversationsProvider'
    );
  }

  return context;
};

export const ConversationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [whatsappID, setWhatsappID] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversations[]>([]);
  const [selectedConversationIndex, setSelectedConversationIndex] =
    useState<number>(0);

  const { contacts } = useContacts();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('whatsapp-id');
      setWhatsappID(data);
    }
  }, []);

  const createConversation = (recipients: string[]) => {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  };

  const addMessageToConversation = ({
    recipients,
    text,
    sender,
  }: {
    recipients: string[];
    text: string;
    sender: string;
  }) => {
    setConversations((prevConversation: any) => {
      let madeChange = false;
      const newMessage = { text, sender };

      const newConversations = prevConversation.map((conversation: any) => {
        if (conversation.recipients.toString() === recipients.toString()) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }

        return conversation;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [...prevConversation, { recipients, message: [newMessage] }];
      }
    });
  };

  const sendMessage = (recipients: string[], text: string) => {
    addMessageToConversation({
      recipients,
      text,
      sender: whatsappID as string,
    });
  };

  //Format again the conversation to see recipients' name and id instead of just a list of ids
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.ID === recipient;
      });

      const name = (contact && contact.name) || recipient;

      return { ID: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.ID === message.sender;
      });

      const name = (contact && contact.name) || message.sender;
      const fromMe = whatsappID === message.sender;

      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;

    return { ...conversation, recipients, selected, messages };
  });

  const value = {
    conversations: formattedConversations,
    createConversation,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

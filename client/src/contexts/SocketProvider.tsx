import { useContext, createContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextValue {
  socket: Socket | undefined;
}

export const SocketContext = createContext<SocketContextValue | undefined>(
  undefined
);

export const useSocket = (): SocketContextValue => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};

export const SocketProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [ID, setID] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('whatsapp-id');
      setID(data);
    }
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:7000', { query: { ID } });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [ID]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

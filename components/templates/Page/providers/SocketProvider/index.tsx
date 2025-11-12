import io, { Socket } from "socket.io-client";

type ContextType = Socket | null;

const SocketContext = React.createContext<ContextType | null>(null);

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    let currentSocket: Socket;

    const connectToSocket = async () => {
      // Connect to socket
      await fetch("/api/socket");
      currentSocket = io();
      setSocket(currentSocket);
    };

    connectToSocket();

    // Disconnect socket and free resource
    return () => {
      if (currentSocket) {
        currentSocket.close();
        setSocket(null);
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => React.useContext(SocketContext) as ContextType;

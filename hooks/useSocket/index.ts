import io, { Socket } from 'socket.io-client'

const useSocket = () => {
  const [socket, setSocket] = React.useState<Socket | null>(null)

  React.useEffect(() => {
    let currentSocket: Socket

    const connectToSocket = async () => {
      // Connect to socket
      await fetch('/api/socket')
      currentSocket = io()
      setSocket(currentSocket)
    }

    connectToSocket()

    // Disconnect socket and free resource
    return () => {
      if (currentSocket) {
        currentSocket.close()
        setSocket(null)
      }
    }
  }, [])

  return socket
}

export default useSocket

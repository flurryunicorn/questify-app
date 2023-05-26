import { io } from "socket.io-client";

const socket = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transport: ["websocket"],
    secure: true,
    rejectUnauthorized: false,
  };
  return io(
    "https://skillbet-backend.herokuapp.com",
    // "http://localhost:3004",
    options
  );
};
export default socket;

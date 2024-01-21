import * as io from "socket.io-client";
import Viewer from "./models/client/Viewer";

const clientAction = () => {
  const socket = io.connect("http://localhost:3000");
  const viewer = new Viewer(socket);
};

export default clientAction;

import express from "express";
import * as http from "http";
import * as socketIo from "socket.io";
import Streamer from "./models/server/Streamer";
import StreamManager from "./models/server/StreamManager";

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server);

const serverAction = () => {
  app.get("/", (req, res) => {
    res.send("Server is running.");
  });

  const streamManager = StreamManager.getInstance();

  app.get("/start", (req, res) => {
    const stream = streamManager.createStream();
    new Streamer(io, stream);
    res.send(`Stream started with ID: ${stream.getId()}`);
  });

  app.get("/kick/:streamId/:viewerId", (req, res) => {
    const { streamId, viewerId } = req.params;
    const stream = streamManager.getStreamById(streamId);

    if (stream) {
      const viewer = stream.getViewer(viewerId);

      if (viewer) {
        stream.removeViewer(viewerId);

        const connectedSockets = io.sockets.sockets;
        const socket = connectedSockets.get(viewerId);

        if (socket) {
          socket.disconnect();
          res.send(`Kicked viewer ${viewerId} from stream ${streamId}`);
        } else {
          res.status(500).send(`Failed to disconnect viewer ${viewerId}`);
        }
      } else {
        res
          .status(404)
          .send(`Viewer with ID ${viewerId} not found in stream ${streamId}`);
      }
    } else {
      res.status(404).send(`Stream with ID ${streamId} not found`);
    }
  });

  server.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
};

export default serverAction;

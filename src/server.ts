import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";
import Streamer from "./models/server/Streamer";
import StreamManager from "./models/server/StreamManager";

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

const streamManager = StreamManager.getInstance();

app.get("/start", (req, res) => {
  const stream = streamManager.createStream();
  new Streamer(io, stream);
  res.send(`Stream started with ID: ${stream.getId()}`);
});

server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

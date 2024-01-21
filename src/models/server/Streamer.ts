import * as socketIo from "socket.io";
import Observer from "./interfaces/Observer";
import Stream from "./Stream";
import StreamManager from "./StreamManager";

class Streamer implements Observer {
  private io: socketIo.Server;
  private stream: Stream;

  constructor(io: socketIo.Server, stream: Stream) {
    this.io = io;
    this.stream = stream;
    this.stream.addObserver(this);

    this.io.on("connection", (socket) => {
      socket.on("disconnect", () => {
        console.log(`Viewer disconnected: ${socket.id}`);
        this.stream.removeObserver(this);
      });

      socket.on("join", (streamId: string) => {
        const requestedStream =
          StreamManager.getInstance().getStreamById(streamId);

        if (requestedStream) {
          socket.join(requestedStream.getId());
          console.log(
            `Viewer ${socket.id} joined stream ${requestedStream.getId()}`
          );
        } else {
          console.log(`Stream with ID ${streamId} not found.`);
        }
      });

      socket.on("message", (message: string) => {
        console.log(`[Viewer] Message from ${socket.id}: ${message}`);
      });
    });
  }

  public update(message: string): void {
    this.io.to(this.stream.getId()).emit("message", message);
  }
}

export default Streamer;

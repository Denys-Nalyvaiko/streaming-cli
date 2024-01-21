import * as socketIo from "socket.io";
import Observer from "./interfaces/Observer";
import Stream from "./Stream";

class Streamer implements Observer {
  private io: socketIo.Server;
  private stream: Stream;

  constructor(io: socketIo.Server, stream: Stream) {
    this.io = io;
    this.stream = stream;
    this.stream.addObserver(this);

    this.io.on("connection", (socket) => {
      console.log(`New viewer connected: ${socket.id}`);
      socket.join(this.stream.getId());

      socket.on("disconnect", () => {
        console.log(`Viewer disconnected: ${socket.id}`);
      });

      socket.on("message", (message: string) => {
        console.log(`[Viewer] Message from ${socket.id}: ${message}`);
        this.stream.notifyObservers(`[Viewer] ${socket.id}: ${message}`);
      });
    });
  }

  public update(message: string): void {
    this.io.to(this.stream.getId()).emit("message", message);
  }
}

export default Streamer;

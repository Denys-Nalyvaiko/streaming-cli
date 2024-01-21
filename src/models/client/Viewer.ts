import * as SocketIOClient from "socket.io-client";
import pkg from "enquirer";
const { prompt } = pkg;

class Viewer {
  private socket: SocketIOClient.Socket;

  constructor(socket: SocketIOClient.Socket) {
    this.socket = socket;
    this.socket.on("connect", () => {
      console.log(`Connected to server as ${this.socket.id}`);
      this.joinStream();
    });

    this.socket.on("message", (message: string) => {
      console.log(message);
      this.handleUserInput();
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });
  }

  private async joinStream(): Promise<void> {
    try {
      const answers: Record<string, any> = await prompt([
        {
          type: "input",
          name: "streamId",
          message: "Enter stream ID to join:",
        },
      ]);

      this.socket.emit("join", answers.streamId);
      this.handleUserInput();
    } catch (error) {
      console.log(error);
    }
  }

  private async handleUserInput(): Promise<void> {
    try {
      const answers: Record<string, any> = await prompt([
        {
          type: "input",
          name: "message",
          message: 'Write a message (or type "exit" to leave):',
        },
      ]);

      if (answers.message.toLowerCase() === "exit") {
        console.log("Exiting stream.");
        this.socket.disconnect();
      } else {
        this.socket.emit("message", answers.message);
        this.handleUserInput();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Viewer;

import * as SocketIOClient from "socket.io-client";
import pkg from "enquirer";
import StreamViewer from "../server/options/StreamViewer";
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

    this.socket.on("viewers-list", (viewers: StreamViewer[]) => {
      console.log("Viewer list:");

      viewers.forEach((viewer) => console.log("-", viewer.id));

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

  private async showViewerList(): Promise<void> {
    this.socket.emit("show-viewers");
  }

  private async donate(): Promise<void> {
    try {
      const answers: Record<string, any> = await prompt([
        {
          type: "input",
          name: "amount",
          message: "Enter donation amount:",
        },
      ]);

      const amount = parseFloat(answers.amount);

      if (!isNaN(amount) && amount > 0) {
        this.socket.emit("donate", amount);
        console.log(`You donated ${amount}`);
      } else {
        console.log("Invalid donation amount. Please enter a valid number");
      }

      this.handleUserInput();
    } catch (error) {
      console.log(error);
    }
  }

  private async writeMessage(): Promise<void> {
    try {
      const answers: Record<string, any> = await prompt([
        {
          type: "input",
          name: "message",
          message: "Write a message:",
        },
      ]);

      const message = answers.message.trim();

      if (message !== "") {
        this.socket.emit("message", message);
        console.log(`You wrote: ${message}`);
      } else {
        console.log("Invalid message. Please enter a non-empty message.");
      }

      this.handleUserInput();
    } catch (error) {
      console.log(error);
    }
  }

  private async handleUserInput(): Promise<void> {
    try {
      const answers: Record<string, any> = await prompt([
        {
          type: "select",
          name: "action",
          message: "Choose an action:",
          choices: ["Write a message", "Donate", "Show Viewer List", "Exit"],
        },
      ]);

      switch (answers.action) {
        case "Write a message":
          await this.writeMessage();
          break;

        case "Donate":
          await this.donate();
          break;

        case "Show Viewer List":
          await this.showViewerList();
          break;

        case "Exit":
          console.log("Exiting stream.");
          this.socket.disconnect();
          break;

        default:
          console.log("Unknow action.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Viewer;

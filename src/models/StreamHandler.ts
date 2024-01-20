import inquirer, { Answers } from "inquirer";
import readline from "readline";
import Stream from "./Stream";
import StreamManager from "./StreamManager";
import Observer from "./interfaces/Observer";

class StreamHandler implements Observer {
  private static instance: StreamHandler;
  private stream: Stream | null | undefined = null;
  private rl: readline.Interface | null = null;

  private constructor() {}

  public static getInstance(): StreamHandler {
    if (!StreamHandler.instance) {
      StreamHandler.instance = new StreamHandler();
    }

    return StreamHandler.instance;
  }

  public async startStream(name: string, description: string): Promise<string> {
    const streamManager = StreamManager.getInstance();
    const streamId = streamManager.createStream(name, description);

    this.stream = streamManager.getStreamById(streamId);

    console.log(`Stream started with ID: ${streamId}`);

    if (this.stream) {
      this.stream.addObserver(this);
    }

    await this.handleInteraction();

    return streamId;
  }

  public async joinStream(streamId: string): Promise<void> {
    const streamManager = StreamManager.getInstance();
    this.stream = streamManager.getStreamById(streamId);

    if (this.stream) {
      console.log(`You are now watching stream: ${streamId}`);
      this.stream.addObserver(this);

      await this.handleInteraction();
    } else {
      console.log("Stream not found");
    }
  }

  public update(message: string): void {
    console.log(`[Viewer] Message from stream: ${message}`);
  }

  public handleInteraction(): void {
    if (this.stream) {
      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const handleLine = async () => {
        const input = await inquirer.prompt({
          type: "input",
          name: "message",
          message: 'Write a message (or type "exit" to leave):',
        });

        if (input.message.toLowerCase() === "exit") {
          console.log("Exiting stream.");
          this.rl?.close();
        } else {
          this.stream?.notifyObservers(input.message);
          handleLine();
        }
      };

      handleLine();

      // this.rl.on("line", async (input) => {
      //   if (input.toLowerCase() === "exit") {
      //     console.log("Exiting stream.");
      //     this.rl?.close();
      //   } else {
      //     this.stream?.notifyObservers(input);
      //   }
      // });
    } else {
      console.log("No active stream. Start or join a stream first.");
    }
  }
}

export default StreamHandler;

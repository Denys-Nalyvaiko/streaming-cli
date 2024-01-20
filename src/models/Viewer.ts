import StreamManager from "./StreamManager";
import Observer from "./interfaces/Observer";

class Viewer implements Observer {
  private streamManager: StreamManager;

  constructor(streamManager: StreamManager) {
    this.streamManager = streamManager;
  }

  public watchStream(streamId: string): void {
    const stream = this.streamManager.getStreamById(streamId);

    if (stream) {
      stream.addObserver(this);
      console.log(`You are watching Stream: ${streamId}`);
    } else {
      console.log("Stream not found");
    }
  }

  public update(message: string): void {
    console.log(`[Viewer] Message from Stream: ${message}`);
  }
}

export default Viewer;

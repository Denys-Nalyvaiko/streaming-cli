import Stream from "./Stream";

class StreamManager {
  private static instance: StreamManager;
  private streams: Map<string, Stream> = new Map();

  private constructor() {}

  public static getInstance(): StreamManager {
    if (!StreamManager.instance) {
      StreamManager.instance = new StreamManager();
    }

    return StreamManager.instance;
  }

  public createStream(name: string, description: string): string {
    const stream = new Stream(name, description);
    const streamId = stream.getId();

    this.streams.set(streamId, stream);

    return streamId;
  }

  public getStreamById(id: string): Stream | undefined {
    return this.streams.get(id);
  }

  public getAllStreams(): Map<string, Stream> {
    return this.streams;
  }
}

export default StreamManager;

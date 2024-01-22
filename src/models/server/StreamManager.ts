import Stream from "./Stream";
import StreamViewer from "./options/StreamViewer";

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

  public createStream(): Stream {
    const streamId = Math.random().toString(36).substring(7);
    const stream = new Stream(streamId);
    this.streams.set(streamId, stream);
    return stream;
  }

  public getStreamById(id: string): Stream | undefined {
    return this.streams.get(id);
  }

  public removeStreamById(id: string): void {
    this.streams.delete(id);
  }

  public getViewerById(
    streamId: string,
    viewerId: string
  ): StreamViewer | undefined {
    const stream = this.getStreamById(streamId);

    if (stream) {
      return stream.getViewer(viewerId);
    }

    return undefined;
  }
}

export default StreamManager;

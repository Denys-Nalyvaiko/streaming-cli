class StreamViewer {
  public id: string;
  private username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }

  public getId(): string {
    return this.id;
  }

  public getUserName(): string {
    return this.username;
  }

  public update(message: string): void {
    console.log(`Received message: ${message}`);
  }
}

export default StreamViewer;

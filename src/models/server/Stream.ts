import Observer from "./interfaces/Observer";
import Donation from "./options/Donation";
import StreamStats from "./options/StreamStats";
import StreamViewer from "./options/StreamViewer";

class Stream implements Observer {
  private id: string;
  private observers: Set<Observer> = new Set();
  private viewers: Map<string, StreamViewer> = new Map();
  private stats: StreamStats = new StreamStats();

  constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public addObserver(observer: Observer): void {
    this.observers.add(observer);
  }

  public removeObserver(observer: Observer): void {
    this.observers.delete(observer);
  }

  public notifyObservers(message: string): void {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }

  public addViewer(viewerId: string, username: string): void {
    const viewer = new StreamViewer(viewerId, username);
    this.viewers.set(viewerId, viewer);
  }

  public removeViewer(viewerId: string): void {
    const removedViewer = this.viewers.get(viewerId);

    if (removedViewer) {
      this.viewers.delete(viewerId);
      this.sendMessageToViewers(
        `Viewer ${viewerId} has been kicked from the stream`
      );
    }
  }

  public getViewerList(): StreamViewer[] {
    return [...this.viewers.values()];
  }

  public getViewer(viewerId: string): StreamViewer | undefined {
    return this.viewers.get(viewerId);
  }

  public sendMessageToViewers(message: string): void {
    for (const viewer of this.viewers.values()) {
      this.notifyViewer(viewer, `[Streamer] ${message}`);
    }
  }

  public notifyViewer(viewer: StreamViewer, message: string): void {
    viewer.update(message);
  }

  public showViewerList(): StreamViewer[] {
    return this.getViewerList();
  }

  public donate(donor: string, amount: number): void {
    const donation = new Donation(donor, amount);
    this.stats.addDonation(donation);
  }

  public update(message: string): void {
    this.sendMessageToViewers(message);
  }
}

export default Stream;

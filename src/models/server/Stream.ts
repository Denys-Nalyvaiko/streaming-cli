import Observer from "./interfaces/Observer";

class Stream {
  private id: string;
  private observers: Set<Observer> = new Set();

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
}

export default Stream;

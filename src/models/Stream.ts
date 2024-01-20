import { nanoid } from "nanoid";
import Observer from "./interfaces/Observer";

class Stream {
  private id: string;
  private name: string;
  private description: string;
  private observers: Observer[] = [];

  constructor(name: string, description: string) {
    this.id = nanoid();
    this.name = name;
    this.description = description;
  }

  public getId(): string {
    return this.id;
  }

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public notifyObservers(message: string): void {
    this.observers.forEach((observer) => observer.update(message));
  }
}

export default Stream;

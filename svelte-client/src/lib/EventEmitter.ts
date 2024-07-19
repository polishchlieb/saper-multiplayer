export class EventListener {
  public eventName: string;
  private fn: Function;
  private eventEmitter: EventEmitter;

  public constructor(eventName: string, fn: Function, eventEmitter: EventEmitter) {
    this.eventName = eventName;
    this.fn = fn;
    this.eventEmitter = eventEmitter;
  }

  public unsubscribe(): void {
    this.eventEmitter.removeEventListener(this);
  }

  public execute(...data: any[]): void {
    this.fn(...data);
  }
}

export default class EventEmitter {
  private listeners: EventListener[] = [];

  public addEventListener(eventName: string, fn: Function): EventListener {
    const listener = new EventListener(eventName, fn, this);
    this.listeners.push(listener);
    return listener;
  }

  public removeEventListener(listener: EventListener): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  public emit(eventName: string, ...data: any[]): void {
    for (const listener of this.listeners) {
      if (listener.eventName === eventName)
        listener.execute(...data);
    }
  }
}
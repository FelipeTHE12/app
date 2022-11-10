export abstract class AggregateRoot {
  protected events: any[];
  protected version: number;

  protected addEvent(event: any) {
    this.events.push(event);
  }
}

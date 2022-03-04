export class NoteInfo {
  constructor(
    public id: string = null,
    public title?: string,
    public content?: string,
    public tag?: string,
    public timestamp?: string
  ) {}
}

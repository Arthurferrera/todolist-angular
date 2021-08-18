export class TodoModel {
  constructor(
    public title: string,
    public description: string,
    public responsible_email: string,
    public responsible_name: string,
    public done?: boolean,
    public changed_pending?: number,
    public id?: number
  ) {}
}

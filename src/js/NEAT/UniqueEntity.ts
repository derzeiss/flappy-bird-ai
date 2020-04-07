let NextId = 1;
export default class UniqueEntity {
  private readonly _id: number;

  constructor() {
    this._id = NextId++;
  }

  is(entity: UniqueEntity): boolean {
    return entity && entity._id === this._id;
  }
}

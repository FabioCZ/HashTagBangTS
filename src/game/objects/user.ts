export class User {
  public static LOCAL_USER:User;

  name:string;
  isHost:boolean;

  public constructor(data)
  {
    this.isHost = data.isHost;
    this.name = data.name;
  }
  get Name():string { return this.name;}
  get IsHost():boolean { return this.isHost;}
}

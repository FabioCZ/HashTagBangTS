import {GameState} from './game-state';
import {User} from './user';
import {Firebase} from '../../firebase';
import {Player} from './player';

export class HashTagBangGame {
    public static Instance:HashTagBangGame;

    id:string;
    started:boolean;
    users:User[];
    model:GameState;

    constructor(data) {
        this.id = data.id;
        this.users = [];
        if (data.users) {
            for (var user of data.users) {
                this.users.push(new User(user));
            }
        }
        this.model = null;//new GameState(data.model);
        this.started = data.started;
    }

    public addUser(user:User) {
        if (!this.hasUser(user))
            this.users.push(user);
    }

    public hasUser(user:User):boolean {
        for (var u in this.users) {
            if (this.users[u].Name === user.Name)
                return true;
        }
        return false;
    }

    public get Users() {
        return this.users;
    }

    public get Model() { return this.model;}

    public set Model(m) {this.model = m;}

    // public get LocalPlayer() { return this.model}

    public get GameStarted():boolean {return this.started;}

    public setStartedTrue() {
        this.started = true;
    }

    public static host(id:string, callback:firebase.CallbackWithError) {
        HashTagBangGame.Instance = new HashTagBangGame({id: id, started:false});
        HashTagBangGame.Instance.addUser(User.LOCAL_USER);
        HashTagBangGame.Instance.save(callback);
    }

    public static join(id:string,callback:firebase.CallbackWithError) {
        Firebase.app.database().ref(`game/${id}`).once('value').then((something:any) => {
                 console.log(User.LOCAL_USER);
 if(something.val().started){
                alert('game is already in progress');
                return;
            }
            HashTagBangGame.Instance = new HashTagBangGame(something.val());
            HashTagBangGame.Instance.addUser(User.LOCAL_USER);
            HashTagBangGame.Instance.save(callback);
        });
    }

    public static subscribe(callback:()=>void) {
        Firebase.app.database().ref(`game/${HashTagBangGame.Instance.id}`).on('value', (something:any) => {
            HashTagBangGame.Instance = new HashTagBangGame(something.val());
            callback();
        });
    }

    public static unsubscribe() {
        Firebase.app.database().ref(`game/${HashTagBangGame.Instance.id}`).off('value');
    }

    public save(callback:firebase.CallbackWithError):void {
        console.log(this)
        Firebase.app.database().ref(`game/${this.id}`).set(this, callback);
    }

    public getLocalPlayer():Player {
        for(let p of this.model.AllPlayers){
            if(p.Name === User.LOCAL_USER.Name){
                return p;
            }
        }
        alert('ooops, couldnt find player in game for local user');
        return null;
    }
}

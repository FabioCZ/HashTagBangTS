/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
import game from '../game';
import {Firebase} from '../firebase';
import {HashTagBangGame} from '../game/objects/hashtag-bang-game';
import {User} from '../game/objects/user';

export enum PromptResponse {
    UNDEFINED,
    POSITIVE,
    NEGATIVE
}

export class Prompt {
    constructor(private response:PromptResponse) {}

    get Response():PromptResponse {return this.response;}
}

export class Play extends Phaser.State {

    private activePrompt:Prompt;
    private myTurn:boolean;
    private endTurnButton: Phaser.Button;
    private playerCardsButtons: Phaser.Button[];

    public preload() {
        game.load.image('board', 'assets/images/game.png');
        game.load.image('end-turn', 'assets/images/end-turn.png')
    }

    private endTurn() {
        var currPlIndex = -1;
        var newCurrPlIndex = -1;

        HashTagBangGame.Instance.Model.AllPlayers.forEach((p,i) => {
            if(p.IsActivePlayer){
                currPlIndex = i;
            }
            p.IsActivePlayer = false;
        })
        newCurrPlIndex = currPlIndex == HashTagBangGame.Instance.Model.AllPlayers.length -1 ? 0 : currPlIndex + 1;
        HashTagBangGame.Instance.Model.AllPlayers[newCurrPlIndex].IsActivePlayer = true;
        HashTagBangGame.Instance.save(e => {if(e)console.log(e);});
    }

    public create() {
        game.add.sprite(0,0, 'board');
        this.endTurnButton = game.add.button(700, 385, 'end-turn', this.endTurn);
        console.log(User.LOCAL_USER);
        //Firebase.app.database().ref(`game/${HashTagBangGame.Instance.id}`).on('value', this.onGameStateChanged);
        //Firebase.app.database().ref(`prompt/${HashTagBangGame.Instance.id/${User.getLocalUser().Name}`).on('value', this.onPromptChanged);        
    }

    public onGameStateChanged = (e) => {
        HashTagBangGame.Instance = new HashTagBangGame(e.val());
        if(HashTagBangGame.Instance.model.CurrentPlayer.Name === User.LOCAL_USER.Name){
            this.changeTurn(true);
        } else {
            this.changeTurn(false);
        }
        this.setPlayerCards();
    }

    public changeTurn(myTurn:boolean):void {
        if(this.myTurn === myTurn) { return;}
        this.endTurnButton.inputEnabled = myTurn;
        
        if(myTurn){

            //enable controls
        } else {
        this.endTurnButton.inputEnabled = false;
            
            //disable controls
        }
    }
    public onPromptChanged = (e) => {
        this.activePrompt = new Prompt(e.val().response);
        alert(this.activePrompt);
    }

    public setPlayerCards(){
        console.log(HashTagBangGame.Instance.getLocalPlayer().Hand);
    }

}
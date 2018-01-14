import {Player} from "../player";
import {CardTarget} from './../card-target';
import {GameState} from "../game-state";

export abstract class Card {
    protected targetPlayer: CardTarget;
    protected cardName: string;
    protected description: string;
    protected id: number;

    constructor() {
    }

    get ID(): number { return this.id; }
    get CardTargetType(): CardTarget { return this.targetPlayer; }
    get CardName(): string { return this.cardName; }
    get CarDescription(): string { return this.description; }

    public abstract play(players: Player[], gameState: GameState): void;

    protected checkValidTargets(players:Player[], gameState:GameState, cardName: string): boolean {
        switch(this.targetPlayer) {
            case CardTarget.YOU:
                if(players.length > 1){
                    alert(cardName + ' can only be played on one player');
                    return false;
                }
                if(!players[0].IsActivePlayer) {
                    alert(cardName + ' can only be played on yourself');
                    return false;
                }
                return true;
            case CardTarget.SOMEONE_ELSE:
                if(players.length > 1){
                    alert(cardName + ' can only be played on one player');
                    return false;
                }
                if(players[0].IsActivePlayer) {
                    alert(cardName + ' can only be played on someone else');
                    return false;
                }
                return true;
            case CardTarget.EVERYONE_ELSE:
                if(players.length != gameState.AllPlayers.length - 1) {
                    alert(cardName + ' must be played on all players except yourself');
                    return false;
                }
                for(var player of players) {
                    if(gameState.CurrentPlayer == player) {
                        alert(cardName + ' may not target the player of the card');
                        return false;
                    }
                }
                return true;
            case CardTarget.EVERYONE:
                if(players.length != gameState.AllPlayers.length) {
                    alert(cardName + ' must be played on every player');
                }

                for(var target of players) {
                    var targeted = false;
                    for(var active of gameState.AllPlayers) {
                        if(target == active) {
                            targeted = true;
                        }
                    }
                }
        }
    }
}


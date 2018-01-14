import { Player } from './player';
import { Card } from './cards/card';
import {DeckFactory} from './cards/deck-factory';
import {BlueCard, Dynamite, Jail} from "./cards/blue-card";
export enum Role {
    SHERIFF,
    VICE,
    OUTLAW,
    RENEGADE
}
export class GameState {
    deck:number[];
    discard:number[];
    
    constructor(private players:Player[]) {
        this.deck = this.shuffleArray(DeckFactory.getNormalDeck());
        this.discard = [];
        for(let p of this.players){
            for(var i = 0; i < p.CurrentLifePoints;i++){
                p.giveCards(this.NextCardFromDeck);
            }
        }
    }

    public get CurrentPlayer() {for(let p of this.players){if(p.IsActivePlayer){return p;}}}

    public get AllPlayers() {return this.players;}

    public get CardForCurrPlayer() {return this.CurrentPlayer.Hand;}

    public get NextCardFromDeck() {return this.deck.pop();}

    public playCard(cardNum:number):void{
        if(this.CurrentPlayer.Hand.indexOf(cardNum) === -1){
            alert('player doesnt have this card');
        }
        //TODO play card
    }

    public transferTurn(){
        this.endTurn();
        this.startTurn();
    }
    public endTurn(){
        var currPl = -1;
        for(var i = 0; i < this.players.length;i++){
            if(this.players[i].IsActivePlayer){
                currPl = i;
            }
        }
        if(currPl === -1){
            console.error('no current player?')
        }
        var nextPl = currPl == this.players.length -1 ? 0 : currPl + 1;
        this.players[currPl].IsActivePlayer = false;
        this.players[nextPl].IsActivePlayer = true;
        //send some kind of notification of turn end.
    }

    public startTurn() {

        //dynamite check
        if (this.CurrentPlayer.hasEquipment(new Dynamite().ID)) {
            var dynamite = this.CurrentPlayer.removeEquipmentCard(new Dynamite().ID);
            if (Math.random() >= 0.8875) {
                this.discard.push(dynamite);
                this.CurrentPlayer.decreaseLifePoints(3);
                if (!this.CurrentPlayer.isPlayerAlive()) {
                    this.endTurn();
                }
            } else {
                var currPl = -1;
                for(var i = 0; i < this.players.length;i++){
                    if(this.players[i].IsActivePlayer){
                        currPl = i;
                    }
                }
                if(currPl === -1){
                    console.error('no current player?')
                }
                var nextPl = currPl == this.players.length -1 ? 0 : currPl + 1;
                this.players[nextPl].Equipment.push(dynamite);
            }
        }

        //jail check
        if (!this.CurrentPlayer.hasEquipment(new Jail().ID)) {
            var jail = this.CurrentPlayer.removeEquipmentCard(new Jail().ID);
            this.discard.push(jail);
            if (Math.random() > 0.75) {
                this.CurrentPlayer.giveCards(this.NextCardFromDeck, this.NextCardFromDeck);
            } else{
                this.endTurn();
            }
        }

        //TODO player turn.
    }

    public handleDeath(deadmeat:Player){
        if(this.players.indexOf(deadmeat) === -1){
            console.error('this player is already dead');
        }

        this.players.splice(this.players.indexOf(deadmeat),1);  //remove this person from player list

        if(deadmeat.Role === Role.OUTLAW){
            this.CurrentPlayer.giveCards(this.NextCardFromDeck,this.NextCardFromDeck,this.NextCardFromDeck);
        }

        if(deadmeat.Role === Role.VICE && this.CurrentPlayer.Role === Role.SHERIFF){
            this.CurrentPlayer.removeAllCardsAndItems();
        }

        if(deadmeat.Role === Role.SHERIFF){
            if(this.isRoleAlive(Role.VICE) || this.isRoleAlive(Role.OUTLAW)){
                //Outlaw win
            } else {
                //Renegade win
            }
        }
        if(deadmeat.Role === Role.OUTLAW && !this.isRoleAlive(Role.RENEGADE))
        {
                //Sheriff wins
        }
        if(deadmeat.Role === Role.RENEGADE && !this.isRoleAlive(Role.OUTLAW)){
                //sheriff win
        }
    }

    public isRoleAlive(role:Role):boolean {
        for(let p of this.players){
            if(p.Role === role){
                return true;
            }
        }
        return false;
    }

    public baseDistanceBetween(player1:Player, player2:Player):number {
        var pl1 = this.players.indexOf(player1);
        var pl2 = this.players.indexOf(player2);
        if(pl1 === -1 || pl2 === -1){
            console.error('ooops');
            return -1;
        }
        if(pl1 < pl2) {
            return Math.min(pl1 - pl2, this.players.length + pl2 - pl1);
        } else {
            return Math.min(pl2 - pl1, this.players.length + pl1 - pl2);
        }
    }

    private getRolesDistribution(numPlayers:number): Role[] {
        var roles = [];
        if(numPlayers >= 4){
            roles.push(Role.SHERIFF);
            roles.push(Role.OUTLAW);
            roles.push(Role.OUTLAW);
            roles.push(Role.RENEGADE);
        }

        if(numPlayers >= 5){
            roles.push(Role.VICE);
        }
        if(numPlayers >= 6){
            roles.push(Role.OUTLAW)
        }
        if(numPlayers === 7){
            roles.push(Role.VICE);
        }
        return this.shuffleArray(roles);
    }

    private shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
}

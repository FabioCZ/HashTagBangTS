/// <reference path='../../../node_modules/phaser/typescript/phaser.d.ts'/>

import {Card} from './cards/Card';
import {Role} from './game-state';
import {BlueCard} from './cards/blue-card';
import {Stats, StatsBuilder} from './stats';
import {DeckFactory} from './cards/deck-factory';
/**
 * Player is a Phaser GameObject that combines a Circle with a Particle Emitter
 * The Player is controlled via the keyboard arrow keys.
 */
export class Player {

    private currentLifePoints: number;
    private isActivePlayer: boolean;    //maybe not needed?
    private hand: number[];
    private equipment: number[];
    private maxLife: number;
    private role: Role;
    private stats: Stats;
    private name: string;

    constructor(data) {
        this.currentLifePoints = data.currentLifePoints;
        this.isActivePlayer = data.isActivePlayer;
        this.hand = data.hand;
        this.equipment = data.equipment;
        this.maxLife = data.maxLife;
        this.role = data.role;
        this.stats = data.stats;
        this.name = data.name;
    }

    get Hand(): number[] { return this.hand; }

    get Equipment(): number[] { return this.equipment; }

    get MaxLife(): number {
        return this.maxLife;
    }

    get CurrentLifePoints(): number {
        return this.currentLifePoints;
    }
    set CurrentLifePoints(lifePoints: number) {
        this.currentLifePoints = lifePoints;
    }
    get IsActivePlayer(): boolean {
        return this.isActivePlayer;
    }
    set IsActivePlayer(isActivePlayer: boolean) {
        this.isActivePlayer = isActivePlayer;
    }

    get Role() { return this.role; }

    get Name() { return this.name; }

    public giveCards(...args: number[]) {
        for (var i = 0, arg; arg = args[i]; i++) {
            this.hand.push(arg);
        }
    }

    //call this when sheriff kills his vice
    public removeAllCardsAndItems() {

    }
    healOneLifePoint() {
        this.currentLifePoints++;
    }

    decreaseOneLifePoint() {
        this.currentLifePoints--;
    }

    healLifePoints(amount: number) {
        this.currentLifePoints = this.currentLifePoints + amount;
    }

    decreaseLifePoints(amount: number) {
        this.currentLifePoints = this.currentLifePoints - amount;
    }


    isPlayerAlive() {
        return this.currentLifePoints != 0;
    }

    public hasEquipment(cardNumber: number): boolean {
        return !this.Equipment.filter((cardNum) => { return cardNum === cardNumber });
    }

    public removeEquipmentCard(cardNumber: number): number {
        var returnCardNum = this.Equipment.filter((cardNum) => { return cardNum === cardNumber }).pop();
        var index: number = this.Equipment.indexOf(returnCardNum);
        this.Equipment.splice(index, 1);
        return returnCardNum;
    }

    getRange() {
        for (var cardNum of this.equipment) {
            var card = DeckFactory.getCardForId(cardNum) as BlueCard;
            if (card.stats.gunRange > this.stats.gunRange)
                return card.stats.gunRange;
        }
        return this.stats.gunRange;
    }
    getDistanceTo() {
        for (var cardNum of this.equipment) {
            var card = DeckFactory.getCardForId(cardNum) as BlueCard;
            if (card.stats.distanceTo < this.stats.distanceTo)
                return card.stats.distanceTo;
        }
        return this.stats.distanceTo;
    }
    getRangeFrom() {
        for (var cardNum of this.equipment) {
            var card = DeckFactory.getCardForId(cardNum) as BlueCard;
            if (card.stats.rangeFrom > this.stats.rangeFrom)
                return card.stats.rangeFrom;
        }
        return this.stats.rangeFrom;
    }

    hasBarrel(): boolean {
        for (var cardNum of this.equipment) {
            var card = DeckFactory.getCardForId(cardNum) as BlueCard;
            if (card.stats.hasBarrel)
                return card.stats.hasBarrel;
        }
        return this.stats.hasBarrel;
    }

    inPrison(): boolean {
        for (var cardNum of this.equipment) {
            var card = DeckFactory.getCardForId(cardNum) as BlueCard;
            if (card.stats.inPrison)
                return card.stats.inPrison;
        }
        return this.stats.inPrison;
    }

    hasDynamite(): boolean {
        for (var cardNum of this.equipment) {
            var card = DeckFactory.getCardForId(cardNum) as BlueCard;
            if (card.stats.hasBarrel)
                return card.stats.hasBarrel;
        }
        return this.stats.hasBarrel;
    }

    hasVolcanic(): boolean {
        for (var cardNum of this.equipment) {
            var card = DeckFactory.getCardForId(cardNum) as BlueCard;
            if (card.stats.isVolcanic)
                return card.stats.isVolcanic;
        }
        return this.stats.isVolcanic;
    }

    // public static updatePlayer(data): Player {
    //     var player = new Player(data);
    //     player.currentLifePoints = data.currentLifePoints;
    //     player.isActivePlayer = data.isActivePlayer;
    //     player.hand = data.hand;
    //     player.equipment = data.equipment;
    //     player.maxLife = data.maxLife;
    //     player.role = data.role;
    //     player.stats = data.stats;
    //     return player;
    // }
}

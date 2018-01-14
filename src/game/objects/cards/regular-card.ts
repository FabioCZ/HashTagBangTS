import {Card} from './Card';
import {Player} from '../Player';
import {CardTarget} from '../card-target';
import {GameState} from '../game-state';

export abstract class RegularCard extends Card {
    public abstract play(players:Player[], gameState:GameState):void;
}


export class Stagecoach extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'Pair Programming';
        this.description = 'Draw 3 cards from the deck.';
        this.id = 1;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class Beer extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'Coffee';
        this.description = 'Gain 1 life point. You may play this out of your turn if you\'re about to die.';
        this.id = 2;        
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class Missed extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.SOMEONE_ELSE;
        this.cardName = 'Unit Test';
        this.description = 'Cancels the effect of a Bug card.';
        this.id = 3;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class Indians extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.EVERYONE_ELSE;
        this.cardName = 'Power Outage';
        this.description = 'All other players must discard a Bug card or lose 1 life point.';
        this.id = 4;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class Panic extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.SOMEONE_ELSE;
        this.cardName = 'Copy and Paste';
        this.description = 'Draw a card from a player at distance one.';
        this.id = 5;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class WellsFargo extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'Stack Overflow';
        this.description = 'Draw 2 cards from the deck.';        
        this.id = 6;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class Bang extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.SOMEONE_ELSE;
        this.cardName = 'Bug';
        this.description = 'Play on another player and reduce their lives by 1.';        
        this.id = 7;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class Duel extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.SOMEONE_ELSE;
        this.cardName = 'Bug Bash';
        this.description = 'The target player discards a Bug, then you etc. First player failing to discard loses 1 life.';
        this.id = 8;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class CatBalou extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.SOMEONE_ELSE;
        this.cardName = 'IDE Crash';
        this.description = 'Force any player to discard 1 card.';
        this.id = 9;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class GeneralStore extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.EVERYONE;
        this.cardName = 'Free Lunch';
        this.description = 'Reveal as many cards as players from the deck. Each player draws one in counter-clockwise order.';
        this.id = 10;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class Gatling extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.EVERYONE_ELSE;
        this.cardName = 'Customer Complaint';
        this.description = 'Applies a Bug on all other players';
        this.id = 11;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}

export class Saloon extends RegularCard {

    constructor() {
        super();
        this.targetPlayer = CardTarget.EVERYONE;
        this.cardName = 'Happy Hour';
        this.description = 'You and all other players gain 1 life point.'
        this.id = 12;
    }

    public play(players:Player[], gameState:GameState):void {

    }
}
import {CardTarget} from '../card-target';
import {Card} from './Card';
import {Player} from '../Player';
import {GameState} from '../game-state';
import {Stats, StatsBuilder} from '../Stats';
import {DeckFactory} from './deck-factory'
export abstract class BlueCard extends Card {
    public stats: Stats;
    public abstract play(players:Player[], gameState:GameState): void;

    public get Stats(): Stats {
        return this.stats;
    }
}


export class Barrel extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'Sonar';
        this.id = 13;
        this.stats = StatsBuilder.builder()
            .isBarrel()
            .build();
        this.description = 'Sonar allows you to draw a card from the deck when you are the target of a Bug. ' +
            'If you draw a Heart, you are missed (just like if you played a Unit Test card).';
    }

    public play(players:Player[], gameState:GameState): void {
        if (!this.checkValidTargets(players, gameState, this.cardName)) {
            return;
            // TODO decide how we will handle this, return to hand or discard?
        }
        var playedOn:Player = players[0];

        for(var equipmentNum of playedOn.Equipment) {
            var equipment = DeckFactory.getCardForId(equipmentNum) as BlueCard;
            if (equipment.Stats.hasBarrel) {
                alert('You already have a sonar');
                return;
                // TODO decide how we will handle this, return to hand or discard?
            }
        }

        playedOn.Equipment.push(this.id);
    }
}

export class Dynamite extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'Feature Branch';
        this.id = 14;
        this.stats = StatsBuilder.builder()
            .isDynamite()
            .build();
        this.description = 'With the Feature Branch in play, before the first phase, draw one card. ' +
            'If you draw a card showing Spades and a number between 2 and 9, discard the Feature Branch card ' +
            'and lose 3 life points. Otherwise, pass the Feature Branch to the player to your left (who will ' +
            'draw on his turn, etc).'
    }

    public play(players:Player[], gameState:GameState): void {
        if (!this.checkValidTargets(players, gameState, this.cardName)) {
            return;
            // TODO decide how we will handle this, return to hand or discard?
        }
        var playedOn:Player = players[0];

        for(var equipmentNum of playedOn.Equipment) {
            var equipment = DeckFactory.getCardForId(equipmentNum) as BlueCard;
            if (equipment.Stats.hasDynamite) {
                alert('There is only one Feature Branch, stop cheating');
                return;
                // TODO decide how we will handle this, return to hand or discard?
                // This should never occur since there is currently only one dynamite
            }
        }

        playedOn.Equipment.push(this.id);
    }
}

export class Jail extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.SOMEONE_ELSE;
        this.cardName = 'Failed Build';
        this.id = 15;
        this.stats = StatsBuilder.builder()
            .isPrison()
            .build();
        this.description = 'If your build fails, before the beginning of your turn, you must draw a card from the deck. ' +
            'If you draw a Heart, you are exempt from fixing the build. Discard the card and continue your turn as normal.';
    }

    public play(players:Player[], gameState:GameState): void {
        // if (!this.checkPlayedOnSelf(players, 'Sonar must be played on self')) {
        //     return;
        //     // TODO decide how we will handle this, return to hand or discard?
        // }
        // var playedOn:Player = players[0];

        // for(var equipment of playedOn.Equipment) {
        //     if (equipment.Stats.hasBarrel) {
        //         alert('You already have a sonar');
        //         return;
        //         // TODO decide how we will handle this, return to hand or discard?
        //     }
        // }
    }
}

export class Mustang extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'Maven';
        this.id = 16;
        this.stats = StatsBuilder.builder()
            .modifyRangeFrom(1)
            .build();
        this.description = 'The distance between other players and you is increased by 1. However, you still see the ' +
            'other players at the normal distance.';
    }

    public play(players:Player[], gameState:GameState): void {
        for (let player of players) {

        }
    }
}

export class Remington extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'Visual Studio';
        this.id = 17;
        this.stats = StatsBuilder.builder()
            .modifyGunRange(3)
            .build();
        this.description = 'Allows you to hit targets with Bugs at a distance of 3.';
    }

    public play(players:Player[], gameState:GameState): void {

    }
}

export class RevCarabine extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'IntelliJ';
        this.id = 18;
        this.stats = StatsBuilder.builder()
            .modifyGunRange(4)
            .build();
        this.description = 'Allows you to hit targets with Bugs at a distance of 4.';
    }

    public play(players:Player[], gameState:GameState): void {

    }
}

export class Schofield extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'NetBeans';
        this.id = 19;
        this.stats = StatsBuilder.builder()
            .modifyGunRange(2)
            .build();
        this.description = 'Allows you to hit targets with Bugs at a distance of 2.';
    }

    public play(players:Player[], gameState:GameState): void {

    }
}

export class Scope extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'Subversion';
        this.id = 20;
        this.stats = StatsBuilder.builder()
            .modifyDistanceTo(-1)
            .build();
        this.description = 'With Subversion in play, you see all other players at a distance decreased by 1. However, other ' +
            'players still see you at the normal distance.';
    }

    public play(players:Player[], gameState:GameState): void {

    }
}

export class Volcanic extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'VIM';
        this.id = 21;
        this.stats = StatsBuilder.builder()
            .isVolcanic()
            .build();
        this.description = 'With VIM in play, you may hit others (distance of 1) with a Bug any number of times.';
    }

    public play(players:Player[], gameState:GameState): void {

    }
}

export class Winchester extends BlueCard {

    constructor(){
        super();
        this.targetPlayer = CardTarget.YOU;
        this.cardName = 'Emacs';
        this.id = 22;
        this.stats = StatsBuilder.builder()
            .modifyGunRange(5)
            .build();
        this.description = 'Allows you to hit targets with Bugs at a distance of 5.';
    }

    public play(players:Player[], gameState:GameState): void {

    }
}
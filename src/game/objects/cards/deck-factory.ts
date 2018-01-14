import {Card} from './Card';
import {Barrel, Dynamite, Jail, Mustang, Scope, Volcanic, Schofield, Remington, RevCarabine, Winchester} from './blue-card';
import {WellsFargo, Gatling, CatBalou, Indians, Duel, GeneralStore, Stagecoach, Panic, Saloon,
    Beer, Bang, Missed} from './regular-card';

export class DeckFactory {
    private static cardMap: Card[] = new Array<Card>();

    public static getCardForId(id:number):Card {
        if(DeckFactory.cardMap == undefined){
            DeckFactory.cardMap = DeckFactory.getDeckCards();
        }
        for(let c of DeckFactory.cardMap){
            if(c.ID === id) return c;
        }
        return null;
    }

    private static getDeckCards() : Card[] {
        var returnDeck = [];
        returnDeck.push(new Barrel());
        returnDeck.push(new Barrel());
        returnDeck.push(new Dynamite());
        returnDeck.push(new Jail());
        returnDeck.push(new Jail());
        returnDeck.push(new Jail());
        returnDeck.push(new Mustang());
        returnDeck.push(new Mustang());
        returnDeck.push(new Scope());
        returnDeck.push(new Volcanic());
        returnDeck.push(new Volcanic());
        returnDeck.push(new Schofield());
        returnDeck.push(new Schofield());
        returnDeck.push(new Schofield());
        returnDeck.push(new Remington());
        returnDeck.push(new RevCarabine());
        returnDeck.push(new Winchester());
        returnDeck.push(new WellsFargo());
        returnDeck.push(new Gatling());
        returnDeck.push(new CatBalou());
        returnDeck.push(new CatBalou());
        returnDeck.push(new CatBalou());
        returnDeck.push(new CatBalou());
        returnDeck.push(new Indians());
        returnDeck.push(new Indians());
        returnDeck.push(new Duel());
        returnDeck.push(new Duel());
        returnDeck.push(new Duel());
        returnDeck.push(new GeneralStore());
        returnDeck.push(new GeneralStore());
        returnDeck.push(new Stagecoach());
        returnDeck.push(new Stagecoach());
        returnDeck.push(new Panic());
        returnDeck.push(new Panic());
        returnDeck.push(new Panic());
        returnDeck.push(new Panic());
        returnDeck.push(new Saloon());


        for (var i = 0; i < 6; i++) {
            returnDeck.push(new Beer());
        }

        for (var i = 0; i < 25; i++) {
            returnDeck.push(new Bang());
        }

        for (var i = 0; i < 12; i++) {
            returnDeck.push(new Missed());
        }

        return returnDeck;
    }

    public static getNormalDeck(): number[] {
        var toRet = new Array<number>();
        DeckFactory.getDeckCards().forEach(c => toRet.push(c.ID));
        return toRet;
    }
}
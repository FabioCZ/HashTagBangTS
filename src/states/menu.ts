/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
import { User } from '../game/objects/user';
import { Card } from '../game/objects/cards/card';
import { Player } from './../game/objects/player';
import { HashTagBangGame } from '../game/objects/hashtag-bang-game';
import { Firebase } from '../firebase';

export class Menu extends Phaser.State {
    headingText: Phaser.Text;
    openGamesHeadingText: Phaser.Text;
    joinGameText: Phaser.Text;
    hostGameText: Phaser.Text;
    openGameTexts:Phaser.Text[];
    fontStyle:any;
    headerFontStyle:any;

    public create() {
        this.fontStyle = {
            font: '18px Walter Turncoat',
            fill: '#7edcfc'
        };
        this.headerFontStyle = {
            font: '24px Walter Turncoat',
            fill: '#7edcfc'
        };
        this.openGameTexts = [];

        this.headingText = this.add.text(this.world.centerX, 50, '#Bang', this.headerFontStyle);
        this.hostGameText = this.add.text(this.world.centerX, this.headingText.y + this.headingText.height + 10, 'Host Game', this.fontStyle);
        this.joinGameText = this.add.text(this.world.centerX, this.hostGameText.y + this.hostGameText.height + 10, 'Join Game', this.fontStyle);
        this.openGamesHeadingText = this.add.text(5, 70, 'Open Games:', this.headerFontStyle);

        this.headingText.anchor.setTo(0.5, 0.5);
        this.joinGameText.anchor.setTo(0.5, 0.5);
        this.hostGameText.anchor.setTo(0.5, 0.5);

        this.hostGameText.inputEnabled = true;
        this.joinGameText.inputEnabled = true;

        this.joinGameText.events.onInputDown.add(this.joinGame, this);
        this.hostGameText.events.onInputDown.add(this.hostGame, this);

        this.getOpenGames()
    }

    private getOpenGames() {
      Firebase.app.database().ref('game').on('value', (data) => {
        var games:any[] = data.val();
        this.openGameTexts.forEach((text:Phaser.Text) => {
          text.destroy();
        });
        this.openGameTexts = [];

        var i:number = 0;
        for(var g in games)
        {
          var game:any = games[g];
          if(game.users.length >= 7)
            continue;
          if(game.started)
            continue;
          var text:Phaser.Text = this.add.text(5, 100+20*i, game.id, this.fontStyle);
          text.inputEnabled = true;
          text.events.onInputDown.add(this.joinGameCallback(game.id), this)
          this.openGameTexts.push(text);
          i++;
        };
      });
    }

    private joinGameCallback(gameId:string) {
      return () => this.joinGame(gameId);
    }

    public joinGame(gameId) {
      if(typeof gameId !== 'string')
        gameId = prompt("Enter game ID");
      var name:string = prompt("Enter name");
      console.log("Joining game "+gameId);
      User.LOCAL_USER = new User({name:name,isHost:false});
      HashTagBangGame.join(gameId, (err:Error) => {
        if(err)
        {
          console.log(err);
          alert("Couldn't join game: "+ err);
          return;
        }

        this.game.state.start('Lobby');
      });
    }

    public hostGame() {
      var gameId:string = prompt("Enter game ID");
      var name:string = prompt("Enter name");
      User.LOCAL_USER = new User({name:name,isHost:true});
      HashTagBangGame.host(gameId, (err:Error) => {
        if(err)
        {
          console.log(err);
          alert("Couldn't host game");
          return;
        }

        this.game.state.start('Lobby');
      });
    }
}

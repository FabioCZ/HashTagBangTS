/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
import { Player } from './../game/objects/player';
import { User } from './../game/objects/user';
import { HashTagBangGame } from '../game/objects/hashtag-bang-game';
import { Firebase } from '../firebase';
import {GameState, Role} from '../game/objects/game-state';
import {Stats, StatsBuilder} from '../game/objects/stats';

export class Lobby extends Phaser.State {
    headingText: Phaser.Text;
    playerText: Phaser.Text[];
    startText: Phaser.Text;
    startButton: Phaser.Text;
    fontStyle = {
        font: '18px Walter Turncoat',
        fill: '#7edcfc'
    };
    public create() {
        this.headingText = this.add.text(this.world.centerX, 50, `Lobby, game id: ${HashTagBangGame.Instance.id}`, this.fontStyle);
        this.headingText.anchor.setTo(0.5, 0.5);
        this.playerText = [];
        for (var i = 0; i < 7; i++) {
            this.playerText[i] = this.add.text(this.world.centerX, 50 + (i + 1) * (this.headingText.height), `Player ${i + 1}: none`, this.fontStyle);
            this.playerText[i].anchor.setTo(0.5, 0.5);
        }
        this.setHost();
        HashTagBangGame.subscribe(this.onUpdate);
    }

    // public refresh() {
    //     Firebase.app.database().ref(`game/${HashTagBangGame.Instance.id}`).on('value', (e: any) => {
    //         HashTagBangGame.Instance = new HashTagBangGame(e.val());
    //         this.setPlayerLabels();
    //     });
    // }

    public onUpdate = () => {
        if (HashTagBangGame.Instance.GameStarted) {
            //maybe something else here as well
            Firebase.app.database().ref(`game/${HashTagBangGame.Instance.id}`).off('value');
            this.game.state.start('Play');
        } else {
            HashTagBangGame.Instance.Users.forEach((user: User, i: number) => {
                this.playerText[i].setText(`Player ${i + 1}: ${user.Name}`);
            });

            for (var i = HashTagBangGame.Instance.Users.length; i < 7; i++) {
                this.playerText[i].setText(`Player ${i + 1}: None`);
            }
        }
    }

    public startGame() {
        console.log("Starting game!");
        if (HashTagBangGame.Instance.Users.length < 4) {
            alert('there are not enough players yet');
        } else {
            HashTagBangGame.Instance.setStartedTrue();
            var roles = this.getRolesDistribution(HashTagBangGame.Instance.Users.length);
            var players = new Array<Player>();
            for (let u of HashTagBangGame.Instance.Users) {
                var role = roles.pop();
                var data:any = {};
                data.currentLifePoints = role == Role.SHERIFF ? 5 : 4;
                data.hand = [];
                data.equipment = [];
                data.maxLife = data.currentLifePoints;
                data.role = role;
                data.stats = StatsBuilder.builder().modifyGunRange(1).build();
                data.name = u.Name;
                data.isActivePlayer = role == Role.SHERIFF;
                players.push(new Player(data));
            }

            HashTagBangGame.Instance.Model = new GameState(players);
            HashTagBangGame.Instance.save(e => {if(e)console.log(e);});
            Firebase.app.database().ref(`game/${HashTagBangGame.Instance.id}`).off('value');
            this.game.state.start('Play');
        }
    }

    public setHost(): void {
        Firebase.app.database().ref(`game/${HashTagBangGame.Instance.id}`).once('value').then((e: any) => {
            var hostName;
            var users = e.val().users;
            for (let u of users) {
                if (u.isHost) {
                    hostName = u.name;
                }
            }
            if (hostName === User.LOCAL_USER.Name) {
                User.LOCAL_USER = new User({name:hostName, isHost:true});
                this.startButton = this.add.text(this.world.centerX, this.world.height - 100, 'Start Game', this.fontStyle);
                this.startButton.anchor.setTo(0.5, 0.5);
                this.startButton.inputEnabled = true;
                this.startButton.events.onInputDown.add(this.startGame, this);
            }
        });
    }

    private getRolesDistribution(numPlayers: number): Role[] {
        var roles = [];
        if (numPlayers >= 4) {
            roles.push(Role.SHERIFF);
            roles.push(Role.OUTLAW);
            roles.push(Role.OUTLAW);
            roles.push(Role.RENEGADE);
        }

        if (numPlayers >= 5) {
            roles.push(Role.VICE);
        }
        if (numPlayers >= 6) {
            roles.push(Role.OUTLAW)
        }
        if (numPlayers === 7) {
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

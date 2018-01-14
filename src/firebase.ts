/// <reference path="../typings/index.d.ts" />

var config = {
    apiKey: "API KEY",
    authDomain: "DOMAIN",
    databaseURL: "DB URL",
    storageBucket: "STORAGE URL",
};

export class Firebase {
    static app = firebase.initializeApp(config);
}

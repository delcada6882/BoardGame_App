import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../interfaces/game';
import { ListType } from '../enums/list-type';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    ownedGames = new BehaviorSubject<Game[]>([]);
    wishListGames = new BehaviorSubject<Game[]>([]);

    constructor() { }

    grabGame(listType: ListType): Game[] {
        return JSON.parse(window.localStorage.getItem(listType.valueOf()) || '[]');
    }

    saveGame(game: Game, listType: ListType) {
        let gameList: Game[] = this.grabGame(listType);
        if (!gameList) {
            gameList = [game];
        } else {
            gameList = [...gameList, game];
        }
        window.localStorage.setItem(listType.valueOf(), JSON.stringify(gameList));

        const parsedUpdateList = this.grabGame(listType);
        if (listType === ListType.OWNEDLIST) {
            this.ownedGames.next(parsedUpdateList);
        } else {
            this.wishListGames.next(parsedUpdateList);
        }
    }

    deleteGame(game: Game, listType: ListType) {
        let gameList: Game[] = this.grabGame(listType)
        const gameIndex = gameList.findIndex(currGame => currGame.id === game.id);
        if (gameIndex > -1) {
            gameList.splice(gameIndex, 1)
            window.localStorage.setItem(listType.valueOf(), JSON.stringify(gameList));
        }

        if (listType === ListType.OWNEDLIST) {
            this.ownedGames.next(gameList.length > 0 ? gameList : []);
        } else {
            this.wishListGames.next(gameList.length > 0 ? gameList : []);
        }
    }

    getGameList(listType: ListType) {
        let list = this.grabGame(listType);

        if (listType === ListType.OWNEDLIST) {
            this.ownedGames.next(!list ? [] : list);
        } else {
            this.wishListGames.next(!list ? [] : list);
        }
    }
}



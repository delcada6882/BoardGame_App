import { Component, OnInit } from '@angular/core';
import { ListType } from 'src/app/enums/list-type';
import { Game } from 'src/app/interfaces/game';
import { GameService } from 'src/app/services/game.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { SortOptions } from 'src/app/interfaces/sort-options';


@Component({
    selector: 'app-game-search',
    templateUrl: './game-search.component.html',
    styleUrls: ['./game-search.component.scss']
})

export class GameSearchComponent implements OnInit {
    games: Game[] = [];
    searchText?: string;
    ownedGames: { [id: string]: Game } = {};
    wishListGames: { [id: string]: Game } = {};

    selectedValue?: string;

    sortOptions: SortOptions[] = [
        { value: 'rank', viewValue: 'Rank' },
        { value: 'price', viewValue: 'Price' },
        { value: 'discount', viewValue: 'Discount' },
        { value: 'reddit_week_count', viewValue: 'Reddit Week Count' },
        { value: 'reddit_day_count', viewValue: 'Reddit Day Count' },
        { value: 'name', viewValue: 'Name' },
        { value: 'year_publisher', viewValue: 'Year Publisher' },
        { value: 'min_age', viewValue: 'Min Age' },
        { value: 'min_playtime', viewValue: 'Min Playtime' },
        { value: 'max_playtime', viewValue: 'Max Playtime' },
        { value: 'min_players', viewValue: 'Min Players' },
        { value: 'max_players', viewValue: 'Max Players' },
    ];

    constructor(
        private router: Router,
        private gameService: GameService,
        private localStorageService: LocalStorageService,
    ) { }

    ngOnInit(): void {
        this.onInitSearch('');
    }

    search() {
        this.localStorageService.getGameList(ListType.OWNEDLIST);
        this.localStorageService.getGameList(ListType.WISHLIST);

        this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
        this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));

        if (this.searchText === undefined) return;
        this.gameService.searchByName(this.searchText).subscribe(games => this.games = games);
    }

    sort() {
        this.localStorageService.getGameList(ListType.OWNEDLIST);
        this.localStorageService.getGameList(ListType.WISHLIST);

        this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
        this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));

        if (this.searchText === undefined) return;
        if (this.selectedValue === undefined) return;
        this.gameService.searchByNameAndSort(this.searchText, this.selectedValue).subscribe(games => this.games = games);
    }

    updateOwnedList(event: MouseEvent, game: Game) {
        event.stopPropagation();

        if (this.ownedGames[game.id]) {
            this.localStorageService.deleteGame(game, ListType.OWNEDLIST);
        } else {
            if (this.wishListGames[game.id]) {
                this.localStorageService.deleteGame(game, ListType.WISHLIST);
            }
            this.localStorageService.saveGame(game, ListType.OWNEDLIST);
        }
    }

    updateWishlist(event: MouseEvent, game: Game) {
        event.stopPropagation();

        if (this.wishListGames[game.id]) {
            this.localStorageService.deleteGame(game, ListType.WISHLIST);
        } else {
            if (this.ownedGames[game.id]) {
                this.localStorageService.deleteGame(game, ListType.OWNEDLIST);
            }
            this.localStorageService.saveGame(game, ListType.WISHLIST);
        }
    }

    onInitSearch(search: string) {

        this.localStorageService.getGameList(ListType.OWNEDLIST);
        this.localStorageService.getGameList(ListType.WISHLIST);

        this.localStorageService.ownedGames.subscribe(games => this.ownedGames = _.mapKeys(games, 'id'));
        this.localStorageService.wishListGames.subscribe(games => this.wishListGames = _.mapKeys(games, 'id'));
        this.gameService.searchByName(search).subscribe(games => this.games = games);
    }

    goToGameDetails(game: Game) {
        this.router.navigate(['./game-details', { gameId: game.id }]);
    }
}

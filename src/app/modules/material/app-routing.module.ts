import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from 'src/app/components/game-details/game-details.component';
import { GameSearchComponent } from 'src/app/components/game-search/game-search.component';
import { UserSelectionsComponent } from 'src/app/components/user-selections/user-selections.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: GameSearchComponent },
  { path: 'owned', component: UserSelectionsComponent },
  { path: 'game-details', component: GameDetailsComponent },
  { path: 'wishlist', component: UserSelectionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/material/app-routing.module';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { GameSearchComponent } from './components/game-search/game-search.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameDetailControlsComponent } from './components/game-detail-controls/game-detail-controls.component';
import { UserSelectionsComponent } from './components/user-selections/user-selections.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    GameSearchComponent,
    GameDetailsComponent,
    GameDetailControlsComponent,
    UserSelectionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { KonfComponent } from './konf/konf.component';
import { LapComponent } from './lap/lap.component';
import { KuldComponent } from './kuld/kuld.component';
import { SeComponent } from './se/se.component';
import { SeDRComponent } from './se-dr/se-dr.component';
import { SeDrAblakComponent } from './se-dr-ablak/se-dr-ablak.component';

@NgModule({
  declarations: [
    AppComponent,
    KonfComponent,
    LapComponent,
    KuldComponent,
    SeComponent,
    SeDRComponent,
    SeDrAblakComponent
  ],
  imports: [
    BrowserModule
    , HttpClientModule
    , FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

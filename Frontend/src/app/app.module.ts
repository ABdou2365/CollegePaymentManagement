import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatList, MatListItem} from "@angular/material/list";



@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatToolbarModule,
    MatButton,
    MatIconModule,
    MatMenuModule,
    MatMenuTrigger,
    MatMenuItem,
    MatSidenavModule,
    MatList,
    MatListItem
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

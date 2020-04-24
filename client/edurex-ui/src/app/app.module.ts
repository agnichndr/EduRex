import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './modules/admin/admin.module';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './modules/admin/admin-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { LibraryRoutingModule } from './modules/library/library-routing.module';
import { LibraryModule } from './modules/library/library.module';
import {MatTreeModule} from '@angular/material/tree';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    LibraryRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTreeModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    LibraryModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

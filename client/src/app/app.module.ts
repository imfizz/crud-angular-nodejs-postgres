import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { ButtonComponent } from './component/button/button.component';
import { PersonsComponent } from './component/persons/persons.component';
import { PersonDataComponent } from './component/person-data/person-data.component';
import { UpdatePersonComponent } from './component/update-person/update-person.component';
import { AddPersonComponent } from './component/add-person/add-person.component';


const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Update/:id/:name/:age/:gender', component: UpdatePersonComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    PersonsComponent,
    PersonDataComponent,
    UpdatePersonComponent,
    HomeComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

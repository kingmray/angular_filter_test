import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { ListComponent } from './list/list.component';
import {Routes} from '@angular/router/src/config';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';

const routes: Routes = [{path: 'list/:filter', component: ListComponent}];
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

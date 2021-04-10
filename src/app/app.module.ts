import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {NgxEchartsModule} from 'ngx-echarts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatTabsModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

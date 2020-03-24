import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CsvVisualizerComponent } from './csv-visualizer/csv-visualizer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { CSVParserService } from './service/csv-parser.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ConstantService } from './service/constant.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CsvVisualizerComponent,
    HeaderComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CSVParserService,
              ConstantService,
              DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CsvVisualizerComponent } from './csv-visualizer/csv-visualizer.component';
import { HeaderComponent } from './header/header.component';
import { ConstantService } from './service/constant.service';
import { CSVParserService } from './service/csv-parser.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';


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

import { Component, ViewChild, OnInit } from '@angular/core';
import { CSVParserService } from './service/csv-parser.service';
import { UserDetails } from './model/user-details.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'csv-file-parser';
 
 

}

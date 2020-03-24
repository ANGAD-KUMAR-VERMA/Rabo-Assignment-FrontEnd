import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CSVParserService } from '../service/csv-parser.service';
import { UserDetails } from '../model/user-details.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-csv-visualizer',
  templateUrl: './csv-visualizer.component.html',
  styleUrls: ['./csv-visualizer.component.scss']
})
export class CsvVisualizerComponent  {

 @Input()
 records:UserDetails[];
 
 constructor(){}

}

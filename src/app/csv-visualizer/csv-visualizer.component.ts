import { Component, Input } from '@angular/core';
import { UserDetails } from '../model/user-details.model';

@Component({
  selector: 'app-csv-visualizer',
  templateUrl: './csv-visualizer.component.html',
  styleUrls: ['./csv-visualizer.component.scss']
})
export class CsvVisualizerComponent {

  @Input()
  records: UserDetails[];

  constructor() { }

} 

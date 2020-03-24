import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvVisualizerComponent } from './csv-visualizer.component';

describe('CsvVisualizerComponent', () => {
  let component: CsvVisualizerComponent;
  let fixture: ComponentFixture<CsvVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

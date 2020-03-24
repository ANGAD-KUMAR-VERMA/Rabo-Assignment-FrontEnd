import { async, TestBed } from '@angular/core/testing';
import { CsvVisualizerComponent } from './csv-visualizer.component';
describe('CsvVisualizerComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CsvVisualizerComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CsvVisualizerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=csv-visualizer.component.spec.js.map
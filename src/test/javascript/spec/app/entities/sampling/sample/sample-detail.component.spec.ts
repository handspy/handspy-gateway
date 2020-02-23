import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SampleDetailComponent } from 'app/entities/sampling/sample/sample-detail.component';
import { Sample } from 'app/shared/model/sampling/sample.model';

describe('Component Tests', () => {
  describe('Sample Management Detail Component', () => {
    let comp: SampleDetailComponent;
    let fixture: ComponentFixture<SampleDetailComponent>;
    const route = ({ data: of({ sample: new Sample(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SampleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SampleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SampleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sample on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sample).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

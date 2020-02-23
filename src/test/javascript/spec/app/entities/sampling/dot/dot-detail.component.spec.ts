import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DotDetailComponent } from 'app/entities/sampling/dot/dot-detail.component';
import { Dot } from 'app/shared/model/sampling/dot.model';

describe('Component Tests', () => {
  describe('Dot Management Detail Component', () => {
    let comp: DotDetailComponent;
    let fixture: ComponentFixture<DotDetailComponent>;
    const route = ({ data: of({ dot: new Dot(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DotDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DotDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DotDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load dot on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dot).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

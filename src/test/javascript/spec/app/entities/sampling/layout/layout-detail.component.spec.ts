import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { LayoutDetailComponent } from 'app/entities/sampling/layout/layout-detail.component';
import { Layout } from 'app/shared/model/sampling/layout.model';

describe('Component Tests', () => {
  describe('Layout Management Detail Component', () => {
    let comp: LayoutDetailComponent;
    let fixture: ComponentFixture<LayoutDetailComponent>;
    const route = ({ data: of({ layout: new Layout(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LayoutDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LayoutDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LayoutDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load layout on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.layout).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

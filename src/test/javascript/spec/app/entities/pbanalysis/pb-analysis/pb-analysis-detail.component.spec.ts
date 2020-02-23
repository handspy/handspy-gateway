import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PBAnalysisDetailComponent } from 'app/entities/pbanalysis/pb-analysis/pb-analysis-detail.component';
import { PBAnalysis } from 'app/shared/model/pbanalysis/pb-analysis.model';

describe('Component Tests', () => {
  describe('PBAnalysis Management Detail Component', () => {
    let comp: PBAnalysisDetailComponent;
    let fixture: ComponentFixture<PBAnalysisDetailComponent>;
    const route = ({ data: of({ pBAnalysis: new PBAnalysis(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PBAnalysisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PBAnalysisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PBAnalysisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pBAnalysis on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pBAnalysis).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

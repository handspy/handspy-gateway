import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PBBurstDetailComponent } from 'app/entities/pbanalysis/pb-burst/pb-burst-detail.component';
import { PBBurst } from 'app/shared/model/pbanalysis/pb-burst.model';

describe('Component Tests', () => {
  describe('PBBurst Management Detail Component', () => {
    let comp: PBBurstDetailComponent;
    let fixture: ComponentFixture<PBBurstDetailComponent>;
    const route = ({ data: of({ pBBurst: new PBBurst(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PBBurstDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PBBurstDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PBBurstDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pBBurst on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pBBurst).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

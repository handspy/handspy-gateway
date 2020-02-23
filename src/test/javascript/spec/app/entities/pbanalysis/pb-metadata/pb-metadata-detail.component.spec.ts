import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PBMetadataDetailComponent } from 'app/entities/pbanalysis/pb-metadata/pb-metadata-detail.component';
import { PBMetadata } from 'app/shared/model/pbanalysis/pb-metadata.model';

describe('Component Tests', () => {
  describe('PBMetadata Management Detail Component', () => {
    let comp: PBMetadataDetailComponent;
    let fixture: ComponentFixture<PBMetadataDetailComponent>;
    const route = ({ data: of({ pBMetadata: new PBMetadata(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PBMetadataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PBMetadataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PBMetadataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pBMetadata on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pBMetadata).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

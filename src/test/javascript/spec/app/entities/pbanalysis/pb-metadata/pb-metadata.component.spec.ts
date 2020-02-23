import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PBMetadataComponent } from 'app/entities/pbanalysis/pb-metadata/pb-metadata.component';
import { PBMetadataService } from 'app/entities/pbanalysis/pb-metadata/pb-metadata.service';
import { PBMetadata } from 'app/shared/model/pbanalysis/pb-metadata.model';

describe('Component Tests', () => {
  describe('PBMetadata Management Component', () => {
    let comp: PBMetadataComponent;
    let fixture: ComponentFixture<PBMetadataComponent>;
    let service: PBMetadataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PBMetadataComponent]
      })
        .overrideTemplate(PBMetadataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PBMetadataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PBMetadataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PBMetadata(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pBMetadata && comp.pBMetadata[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

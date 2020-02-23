import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PBMetadataUpdateComponent } from 'app/entities/pbanalysis/pb-metadata/pb-metadata-update.component';
import { PBMetadataService } from 'app/entities/pbanalysis/pb-metadata/pb-metadata.service';
import { PBMetadata } from 'app/shared/model/pbanalysis/pb-metadata.model';

describe('Component Tests', () => {
  describe('PBMetadata Management Update Component', () => {
    let comp: PBMetadataUpdateComponent;
    let fixture: ComponentFixture<PBMetadataUpdateComponent>;
    let service: PBMetadataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PBMetadataUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PBMetadataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PBMetadataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PBMetadataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PBMetadata(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PBMetadata();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

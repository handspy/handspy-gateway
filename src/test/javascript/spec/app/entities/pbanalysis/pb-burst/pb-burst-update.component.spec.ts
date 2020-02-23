import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PBBurstUpdateComponent } from 'app/entities/pbanalysis/pb-burst/pb-burst-update.component';
import { PBBurstService } from 'app/entities/pbanalysis/pb-burst/pb-burst.service';
import { PBBurst } from 'app/shared/model/pbanalysis/pb-burst.model';

describe('Component Tests', () => {
  describe('PBBurst Management Update Component', () => {
    let comp: PBBurstUpdateComponent;
    let fixture: ComponentFixture<PBBurstUpdateComponent>;
    let service: PBBurstService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PBBurstUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PBBurstUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PBBurstUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PBBurstService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PBBurst(123);
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
        const entity = new PBBurst();
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

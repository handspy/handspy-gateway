import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DotUpdateComponent } from 'app/entities/sampling/dot/dot-update.component';
import { DotService } from 'app/entities/sampling/dot/dot.service';
import { Dot } from 'app/shared/model/sampling/dot.model';

describe('Component Tests', () => {
  describe('Dot Management Update Component', () => {
    let comp: DotUpdateComponent;
    let fixture: ComponentFixture<DotUpdateComponent>;
    let service: DotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DotUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DotUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DotUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DotService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dot(123);
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
        const entity = new Dot();
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

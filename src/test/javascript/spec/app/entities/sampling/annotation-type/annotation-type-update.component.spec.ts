import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AnnotationTypeUpdateComponent } from 'app/entities/sampling/annotation-type/annotation-type-update.component';
import { AnnotationTypeService } from 'app/entities/sampling/annotation-type/annotation-type.service';
import { AnnotationType } from 'app/shared/model/sampling/annotation-type.model';

describe('Component Tests', () => {
  describe('AnnotationType Management Update Component', () => {
    let comp: AnnotationTypeUpdateComponent;
    let fixture: ComponentFixture<AnnotationTypeUpdateComponent>;
    let service: AnnotationTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnnotationTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AnnotationTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnnotationTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnnotationTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AnnotationType(123);
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
        const entity = new AnnotationType();
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

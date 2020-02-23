import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AnnotationUpdateComponent } from 'app/entities/sampling/annotation/annotation-update.component';
import { AnnotationService } from 'app/entities/sampling/annotation/annotation.service';
import { Annotation } from 'app/shared/model/sampling/annotation.model';

describe('Component Tests', () => {
  describe('Annotation Management Update Component', () => {
    let comp: AnnotationUpdateComponent;
    let fixture: ComponentFixture<AnnotationUpdateComponent>;
    let service: AnnotationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnnotationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AnnotationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnnotationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnnotationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Annotation(123);
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
        const entity = new Annotation();
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

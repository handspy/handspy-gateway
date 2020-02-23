import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TextUpdateComponent } from 'app/entities/sampling/text/text-update.component';
import { TextService } from 'app/entities/sampling/text/text.service';
import { Text } from 'app/shared/model/sampling/text.model';

describe('Component Tests', () => {
  describe('Text Management Update Component', () => {
    let comp: TextUpdateComponent;
    let fixture: ComponentFixture<TextUpdateComponent>;
    let service: TextService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TextUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TextUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TextUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TextService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Text(123);
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
        const entity = new Text();
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

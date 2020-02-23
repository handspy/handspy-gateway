import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProjectPermissionUpdateComponent } from 'app/entities/project/project-permission/project-permission-update.component';
import { ProjectPermissionService } from 'app/entities/project/project-permission/project-permission.service';
import { ProjectPermission } from 'app/shared/model/project/project-permission.model';

describe('Component Tests', () => {
  describe('ProjectPermission Management Update Component', () => {
    let comp: ProjectPermissionUpdateComponent;
    let fixture: ComponentFixture<ProjectPermissionUpdateComponent>;
    let service: ProjectPermissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProjectPermissionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProjectPermissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProjectPermissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProjectPermissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProjectPermission(123);
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
        const entity = new ProjectPermission();
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

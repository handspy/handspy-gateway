import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProjectPermissionComponent } from 'app/entities/project/project-permission/project-permission.component';
import { ProjectPermissionService } from 'app/entities/project/project-permission/project-permission.service';
import { ProjectPermission } from 'app/shared/model/project/project-permission.model';

describe('Component Tests', () => {
  describe('ProjectPermission Management Component', () => {
    let comp: ProjectPermissionComponent;
    let fixture: ComponentFixture<ProjectPermissionComponent>;
    let service: ProjectPermissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProjectPermissionComponent]
      })
        .overrideTemplate(ProjectPermissionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProjectPermissionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProjectPermissionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProjectPermission(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.projectPermissions && comp.projectPermissions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

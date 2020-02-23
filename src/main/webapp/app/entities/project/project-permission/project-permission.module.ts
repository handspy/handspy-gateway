import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProjectPermissionComponent } from './project-permission.component';
import { ProjectPermissionDetailComponent } from './project-permission-detail.component';
import { ProjectPermissionUpdateComponent } from './project-permission-update.component';
import { ProjectPermissionDeleteDialogComponent } from './project-permission-delete-dialog.component';
import { projectPermissionRoute } from './project-permission.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(projectPermissionRoute)],
  declarations: [
    ProjectPermissionComponent,
    ProjectPermissionDetailComponent,
    ProjectPermissionUpdateComponent,
    ProjectPermissionDeleteDialogComponent
  ],
  entryComponents: [ProjectPermissionDeleteDialogComponent]
})
export class ProjectProjectPermissionModule {}

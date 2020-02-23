import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LayoutDetailComponent } from './layout-detail.component';
import { LayoutUpdateComponent } from './layout-update.component';
import { LayoutDeleteDialogComponent } from './layout-delete-dialog.component';
import { layoutRoute } from './layout.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(layoutRoute)],
  declarations: [LayoutComponent, LayoutDetailComponent, LayoutUpdateComponent, LayoutDeleteDialogComponent],
  entryComponents: [LayoutDeleteDialogComponent]
})
export class SamplingLayoutModule {}

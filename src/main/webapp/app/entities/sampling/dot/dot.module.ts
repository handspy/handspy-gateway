import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { DotComponent } from './dot.component';
import { DotDetailComponent } from './dot-detail.component';
import { DotUpdateComponent } from './dot-update.component';
import { DotDeleteDialogComponent } from './dot-delete-dialog.component';
import { dotRoute } from './dot.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(dotRoute)],
  declarations: [DotComponent, DotDetailComponent, DotUpdateComponent, DotDeleteDialogComponent],
  entryComponents: [DotDeleteDialogComponent]
})
export class SamplingDotModule {}

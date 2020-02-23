import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProtocolComponent } from './protocol.component';
import { ProtocolDetailComponent } from './protocol-detail.component';
import { ProtocolUpdateComponent } from './protocol-update.component';
import { ProtocolDeleteDialogComponent } from './protocol-delete-dialog.component';
import { protocolRoute } from './protocol.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(protocolRoute)],
  declarations: [ProtocolComponent, ProtocolDetailComponent, ProtocolUpdateComponent, ProtocolDeleteDialogComponent],
  entryComponents: [ProtocolDeleteDialogComponent]
})
export class SamplingProtocolModule {}

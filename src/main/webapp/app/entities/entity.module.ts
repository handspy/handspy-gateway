import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'project',
        loadChildren: () => import('./project/project/project.module').then(m => m.ProjectProjectModule)
      },
      {
        path: 'project-permission',
        loadChildren: () => import('./project/project-permission/project-permission.module').then(m => m.ProjectProjectPermissionModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./project/task/task.module').then(m => m.ProjectTaskModule)
      },
      {
        path: 'label',
        loadChildren: () => import('./project/label/label.module').then(m => m.ProjectLabelModule)
      },
      {
        path: 'participant',
        loadChildren: () => import('./project/participant/participant.module').then(m => m.ProjectParticipantModule)
      },
      {
        path: 'layout',
        loadChildren: () => import('./sampling/layout/layout.module').then(m => m.SamplingLayoutModule)
      },
      {
        path: 'device',
        loadChildren: () => import('./sampling/device/device.module').then(m => m.SamplingDeviceModule)
      },
      {
        path: 'annotation-type',
        loadChildren: () => import('./sampling/annotation-type/annotation-type.module').then(m => m.SamplingAnnotationTypeModule)
      },
      {
        path: 'sample',
        loadChildren: () => import('./sampling/sample/sample.module').then(m => m.SamplingSampleModule)
      },
      {
        path: 'note',
        loadChildren: () => import('./sampling/note/note.module').then(m => m.SamplingNoteModule)
      },
      {
        path: 'protocol',
        loadChildren: () => import('./sampling/protocol/protocol.module').then(m => m.SamplingProtocolModule)
      },
      {
        path: 'dot',
        loadChildren: () => import('./sampling/dot/dot.module').then(m => m.SamplingDotModule)
      },
      {
        path: 'text',
        loadChildren: () => import('./sampling/text/text.module').then(m => m.SamplingTextModule)
      },
      {
        path: 'annotation',
        loadChildren: () => import('./sampling/annotation/annotation.module').then(m => m.SamplingAnnotationModule)
      },
      {
        path: 'pb-analysis',
        loadChildren: () => import('./pbanalysis/pb-analysis/pb-analysis.module').then(m => m.PbanalysisPBAnalysisModule)
      },
      {
        path: 'pb-burst',
        loadChildren: () => import('./pbanalysis/pb-burst/pb-burst.module').then(m => m.PbanalysisPBBurstModule)
      },
      {
        path: 'pb-metadata',
        loadChildren: () => import('./pbanalysis/pb-metadata/pb-metadata.module').then(m => m.PbanalysisPBMetadataModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification/notification.module').then(m => m.NotificationNotificationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatewayEntityModule {}

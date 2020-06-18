import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { ErrorComponent } from './error/error.component';
import { VideoResolverService } from './video-center/video-resolver.service';
import { VideoDetailComponent } from './video-center/video-detail/video-detail.component';
import { VideoEditComponent } from './video-center/video-edit/video-edit.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'videos',
    component: VideoCenterComponent,
    resolve: [VideoResolverService],
    children: [
      {
        path: 'new',
        component: VideoEditComponent
      },
      {
        path: ':id',
        component: VideoDetailComponent,
        resolve: [VideoResolverService]
      },
      {
        path: ':id/edit',
        component: VideoEditComponent,
        resolve: [VideoResolverService]
      }
    ]
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

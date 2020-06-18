import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { VideoCenterComponent } from './video-center/video-center.component';
import { ErrorComponent } from './error/error.component';
import { VideoListComponent } from './video-center/video-list/video-list.component';
import { VideoDetailComponent } from './video-center/video-detail/video-detail.component';
import { VideoEditComponent } from './video-center/video-edit/video-edit.component';
import { VideoItemComponent } from './video-center/video-list/video-item/video-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    VideoCenterComponent,
    ErrorComponent,
    VideoListComponent,
    VideoDetailComponent,
    VideoEditComponent,
    VideoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

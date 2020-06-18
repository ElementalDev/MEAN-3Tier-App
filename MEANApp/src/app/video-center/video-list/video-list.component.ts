import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from '../video.model';
import { VideoCenterService } from '../video-center.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {

  videos: Video[];
  subscription: Subscription;

  constructor(
    private videoCenterService: VideoCenterService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }


  ngOnInit() {
    this.videos = this.videoCenterService.getVideos();
    this.subscription = this.videoCenterService.videosChanged.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
      }
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.currentRoute });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Video } from '../video.model';
import { VideoCenterService } from '../video-center.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit, OnChanges {

  id: string;
  video: Video;
  editTitle = false;

  constructor(
    private videoCenterService: VideoCenterService,
    private currentRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.video = this.videoCenterService.getVideo(this.id);
      }
    );
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  onEdit(id: string) {
    this.router.navigate(['edit'], { relativeTo: this.currentRoute });
  }

  onDelete() {
    this.apiService.deleteVideo(this.id).subscribe();
    this.router.navigate(['../'], { relativeTo: this.currentRoute });
  }

  sanitizeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
  }
}

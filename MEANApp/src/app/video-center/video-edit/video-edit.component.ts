import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { NgForm } from '@angular/forms';
import { Video } from '../video.model';
import { VideoCenterService } from '../video-center.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private videoCenterService: VideoCenterService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  @ViewChild('videoForm', { static: true }) vidForm: NgForm;
  subscription: Subscription;
  editMode = false;
  edittedItem: Video;
  edittedItemId: string;

  ngOnInit() {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.editMode = params.id != null;

        if (this.editMode) {

          this.edittedItemId = params.id;
          this.edittedItem = this.videoCenterService.getVideo(params.id);
          setTimeout(() => {
            this.vidForm.setValue({
              title: this.edittedItem.title,
              url: this.edittedItem.url,
              description: this.edittedItem.description
            });
          });

        }
      }
    );
  }

  onSubmit(form: NgForm) {

    const newVideo = new Video(null, form.value.title, form.value.url, form.value.description);

    if (!this.editMode) {
      this.apiService.addVideo(newVideo).subscribe();
    } else {
      this.apiService.updateVideo(this.edittedItemId, newVideo).subscribe();
    }

    this.editMode = false;
    form.reset();
  }

}

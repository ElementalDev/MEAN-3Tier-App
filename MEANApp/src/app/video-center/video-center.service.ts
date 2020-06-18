import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Video } from './video.model';
import { ApiService } from '../api.service';

@Injectable({ providedIn: 'root' })
export class VideoCenterService {

    videosChanged = new Subject<Video[]>();
    private videos: Video[] = [];


    constructor(
    ) { }

    setVideos(videos: Video[]) {
        this.videos = videos;
        this.videosChanged.next(this.videos.slice());
    }

    getVideos() {
        return this.videos.slice();
    }

    getVideo(id: string) {
        for (const video of this.videos) {
            if (video._id === id) {
                return video;
            }
        }
    }

}

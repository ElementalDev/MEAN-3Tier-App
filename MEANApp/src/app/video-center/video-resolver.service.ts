import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { VideoCenterService } from './video-center.service';
import { ApiService } from '../api.service';
import { Video } from './video.model';

@Injectable({ providedIn: 'root' })
export class VideoResolverService implements Resolve<Video[]> {

    constructor(private videoCenterService: VideoCenterService, private apiService: ApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const videos = this.videoCenterService.getVideos();

        if (videos.length === 0) {
            return this.apiService.getVideos();
        } else {
            return videos;
        }
    }
}

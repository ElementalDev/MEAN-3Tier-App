import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideoCenterService } from './video-center/video-center.service';
import { Video } from './video-center/video.model';
import { map, tap, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private http: HttpClient,
        private videoCenterService: VideoCenterService,
        private router: Router,
        private currentRoute: ActivatedRoute, ) { }

    private apiUrl = environment.apiUrl;

    getVideos() {

        return this.http.get<Video[]>(
            this.apiUrl + '/videos',
        ).pipe(
            catchError(
                (err) => {
                    console.log(err.message)
                    return throwError(err.message);
                }
            ),
            map(
                (videos) => {
                    return videos.map(
                        (video) => {
                            return { ...video };
                        }
                    );
                }
            ),
            tap(
                (videos) => {
                    this.videoCenterService.setVideos(videos);
                }
            )
        );
    }

    addVideo(newVideo: Video) {
        return this.http.post<Video>(
            this.apiUrl + '/videos',
            newVideo
        )
            .pipe(
                catchError(
                    (err) => {
                        console.log(err.message)
                        return throwError(err.message);
                    }
                ),
                tap(
                    () => {
                        this.getVideos().subscribe();
                        this.router.navigate(['/videos'], { relativeTo: this.currentRoute });
                    }
                )

            );
    }

    updateVideo(id: string, updatedVideo: Video) {
        return this.http.put(
            this.apiUrl + '/videos/' + id,
            updatedVideo
        ).pipe(
            catchError(
                (err) => {
                    console.log(err.message)
                    return throwError(err.message);
                }
            ),
            tap(
                () => {
                    this.getVideos().subscribe();
                    this.router.navigate(['/videos'], { relativeTo: this.currentRoute });
                }
            )

        );
    }

    deleteVideo(id: string) {
        return this.http.delete(
            this.apiUrl + '/videos/' + id
        ).pipe(
            catchError(
                (err) => {
                    console.log(err.message)
                    return throwError(err.message);
                }
            ),
            tap(
                () => {
                    this.getVideos().subscribe();
                    this.router.navigate(['/videos'], { relativeTo: this.currentRoute });
                }
            )

        );
    }

}

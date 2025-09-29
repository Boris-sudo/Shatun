import {Injectable, signal} from '@angular/core';
import {BlogPost} from '../models/blog-post.model';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, forkJoin, map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BlogsService {
    blogs = signal<BlogPost[]>([]);
    private readonly basePath = 'blogs/';

    constructor(private http: HttpClient) {
        firstValueFrom(this.getAllBlogs()).then(resp => {
            firstValueFrom(resp).then(r => {
                this.blogs.set(r);
            })
        }).catch(err => console.log(err));
    }

    getAllBlogs(): Observable<Observable<any>> {
        return this.http.get<any>(`${this.basePath}manifest.json`).pipe(
            map(manifest => manifest.files),
            map(files => files.map((file: string) =>
                this.http.get<any>(`${this.basePath}${file}`)
            )),
            map(requests => forkJoin(requests))
        );
    }

    getBlog(id: number): BlogPost | undefined {
        for (const blog of this.blogs()) {
            if (blog.id === id)
                return blog;
        }
        return undefined;
    }
}

import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    OnDestroy,
    QueryList,
    signal,
    ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationsService } from '../../services/animations';
import { BlogsService } from '../../services/blogs';
import { ExpeditionPost } from '../../models/expedition-post.model';

@Component({
    selector: 'app-blogs',
    imports: [],
    templateUrl: './blogs.html',
    styleUrl: './blogs.css'
})
export class Blogs implements AfterViewInit, OnDestroy {
    @ViewChildren('visible') visibleElements!: QueryList<ElementRef>;

    blogs = signal<ExpeditionPost[]>([]);

    constructor(
        private router: Router,
        private blogsService: BlogsService,
        private animationsService: AnimationsService
    ) {
        effect(() => {
            this.blogs.set(this.blogsService.blogs());
        });
    }

    ngAfterViewInit() {
        this.visibleElements.forEach(element => this.animationsService.addObservableElement(element.nativeElement));
    }

    ngOnDestroy() {
        this.animationsService.destroyObserver();
    }

    redirectTo(url: string) {
        window.scrollTo({
            top: 0
        });
        this.router.navigate([url]);
    }

    redirectToId(id: number) {
        this.redirectTo(`blog/${id}`);
    }
}


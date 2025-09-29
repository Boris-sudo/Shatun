import {AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {BlogsService} from '../../services/blogs';
import {AnimationsService} from '../../services/animations';
import {SplitHeading} from '../../directives/split-heading';
import {MoveableImage} from '../../directives/moveable-image';

@Component({
    selector: 'app-blogs',
    imports: [
        SplitHeading,
        MoveableImage
    ],
    templateUrl: './blogs.html',
    styleUrl: './blogs.css'
})
export class Blogs implements AfterViewInit, OnDestroy {
    @ViewChildren('visible') visibleElements!: QueryList<ElementRef>;

    constructor(
        private router: Router,
        private blogsService: BlogsService,
        private animationsService: AnimationsService
    ) {
    }

    ngAfterViewInit() {
        this.visibleElements.forEach(element => this.animationsService.addObservableElement(element.nativeElement));
    }

    ngOnDestroy() {
        this.animationsService.destroyObserver();
    }

    redirectToBlog(id: number) {
        window.scrollTo({
            top: 0,
        });
        this.router.navigate([`blog/${id}`]);
    }
}

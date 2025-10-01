import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { SplitHeading } from '../../directives/split-heading';
import { Router } from '@angular/router';
import { BlogsService } from '../../services/blogs';
import { AnimationsService } from '../../services/animations';

@Component({
  selector: 'app-future',
    imports: [
        SplitHeading
    ],
  templateUrl: './future.html',
  styleUrl: './future.css'
})
export class Future implements AfterViewInit, OnDestroy {
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
        this.router.navigate([`future/${id}`]);
    }
}


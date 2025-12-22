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
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpeditionPost } from '../../models/expedition-post.model';
import { AnimationsService } from '../../services/animations';
import { FutureExpeditionsService } from '../../services/future-expeditions';

@Component({
    selector: 'app-expeditions',
    imports: [
        FormsModule
    ],
    templateUrl: './future-expeditions.html',
    styleUrl: './future-expeditions.css'
})
export class FutureExpeditions implements AfterViewInit, OnDestroy {
    @ViewChildren('visible') visibleElements!: QueryList<ElementRef>;

    blogs = signal<ExpeditionPost[]>([]);


    constructor(
        private router: Router,
        private blogsService: FutureExpeditionsService,
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
        this.redirectTo(`expedition/${ id }`);
    }

    ConvertDate(date: string) {
        return date.split('.').join(' ');
    }
}

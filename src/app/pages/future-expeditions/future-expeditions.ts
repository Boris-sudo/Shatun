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
import { ExpeditionsService } from '../../services/expeditions';
import { AnimationsService } from '../../services/animations';
import { SplitHeading } from '../../directives/split-heading';
import { MoveableImage } from '../../directives/moveable-image';
import { ExpeditionPost } from '../../models/expedition-post.model';

@Component({
    selector: 'app-expeditions',
    imports: [
        SplitHeading,
        MoveableImage
    ],
    templateUrl: './future-expeditions.html',
    styleUrl: './future-expeditions.css'
})
export class FutureExpeditions implements AfterViewInit, OnDestroy {
    @ViewChildren('visible') visibleElements!: QueryList<ElementRef>;

    expeditions = signal<ExpeditionPost[]>([]);

    contentLoaded = signal(false);

    constructor(
        private router: Router,
        private expeditionsService: ExpeditionsService,
        private animationsService: AnimationsService
    ) {
        effect(() => {
            this.expeditions.set(this.expeditionsService.expeditions());
        });
        effect(() => {
            const expeditionsSize = this.expeditions().length;
            const contentLoaded = this.contentLoaded();

            if (expeditionsSize > 0 && contentLoaded) {
                setTimeout(() => {
                    this.visibleElements.forEach(element => this.animationsService.addObservableElement(element.nativeElement));
                }, 10);
            }
        });
    }

    ngAfterViewInit() {
        this.contentLoaded.set(true);
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

    redirectToBlog(id: number) {
        this.redirectTo(`expedition/${ id }`)
    }
}

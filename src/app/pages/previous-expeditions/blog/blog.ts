import {
    AfterViewInit,
    Component, effect,
    ElementRef,
    OnDestroy,
    QueryList,
    Renderer2,
    signal, ViewChild,
    ViewChildren
} from '@angular/core';
import { SplitHeading } from '../../../directives/split-heading';
import { MoveableImage } from '../../../directives/moveable-image';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationsService } from '../../../services/animations';
import { PreviousExpeditionsService } from '../../../services/previous-expeditions';
import { ExpeditionPost } from '../../../models/expedition-post.model';
import { SlicePipe } from '@angular/common';

@Component({
    selector: 'app-blog',
    imports: [
        SplitHeading,
        MoveableImage,
        SlicePipe
    ],
    templateUrl: './blog.html',
    styleUrl: './blog.css'
})
export class Blog implements AfterViewInit, OnDestroy {
    @ViewChildren('visible') visibleElements!: QueryList<ElementRef>;
    @ViewChild('gallery') galleryContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('bigScreenContent') bigScreenContent!: ElementRef<HTMLDivElement>;
    @ViewChild('smallScreenContent') smallScreenContent!: ElementRef<HTMLDivElement>;
    blog!: ExpeditionPost;

    blogs = signal<ExpeditionPost[]>([]);

    private galleryColumns = 0;

    private contentLoaded = signal<boolean>(false);
    public blogLoaded = signal<boolean>(false);

    constructor(
        private renderer: Renderer2,
        private route: ActivatedRoute,
        private router: Router,
        private blogsService: PreviousExpeditionsService,
        private animationsService: AnimationsService
    ) {
        effect(() => {
            const blogs = this.blogsService.blogs();
            this.blogs.set(blogs);
            if (blogs.length > 0) this.getBlog();
        });
        effect(() => {
            const loaded = this.contentLoaded() && this.blogLoaded();
            if (loaded) {
                setTimeout(() => {
                    addEventListener('resize', () => {
                        this.setImages();
                    });
                    this.setImages();
                    this.visibleElements.forEach(el => {
                        this.animationsService.addObservableElement(el.nativeElement);
                    });
                });
            }
        });
    }

    ngAfterViewInit() {
        this.contentLoaded.set(true);
    }

    ngOnDestroy() {
        this.animationsService.destroyObserver();
    }

    getBlog() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const blog = this.blogsService.getBlog(id);
        if (blog === undefined)
            this.router.navigate(['futures']);
        this.blog = blog!;
        this.blogLoaded.set(true);
    }

    redirectTo(url: string) {
        window.scrollTo(0, 0);
        setTimeout(() => {
            this.router.navigate([url]);
        });
    }

    async setImages() {
        const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

        const windowWidth = window.innerWidth;
        let columnsCount = 0;

        if (windowWidth < 652) columnsCount = 1;
        else if (windowWidth < 1004) columnsCount = 2;
        else columnsCount = 3;

        if (columnsCount === this.galleryColumns) return;
        this.galleryColumns = columnsCount;

        const gallery = this.galleryContainer.nativeElement;
        gallery.innerHTML = '';

        await sleep(10);

        for (let i = 0; i < this.galleryColumns; i++) {
            const col = this.renderer.createElement('div');
            col.style.width = `calc((100% - 20px * ${ this.galleryColumns - 1 }) / ${ this.galleryColumns })`;
            gallery.appendChild(col);
        }

        const columns = gallery.children;
        for (const src of this.blog.images) {
            let index = 0;
            for (let i = 0; i < columns.length; i++) {
                if (columns.item(i)!.getBoundingClientRect().height < columns.item(index)!.getBoundingClientRect().height)
                    index = i;
            }

            const image = this.renderer.createElement('img');
            image.src = src;
            this.animationsService.addObservableElement(image);
            columns.item(index)!.appendChild(image);

            await sleep(10);
        }
    }
}


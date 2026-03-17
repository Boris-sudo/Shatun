import { SlicePipe } from '@angular/common';
import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    OnDestroy,
    QueryList,
    Renderer2,
    signal,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoveableImage } from '../../../directives/moveable-image';
import { SplitHeading } from '../../../directives/split-heading';
import { ExpeditionPost } from '../../../models/expedition-post.model';
import { AnimationsService } from '../../../services/animations';
import { PreviousExpeditionsService } from '../../../services/previous-expeditions';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface SafeBlogContent {
    title: string;
    content: SafeHtml,
    images: string[];
}

@Component({
    selector: 'app-blog',
    standalone: true,
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

    blogContent: Array<SafeBlogContent> = [];

    private galleryColumns = 0;

    private contentLoaded = signal<boolean>(false);
    public blogLoaded = signal<boolean>(false);

    constructor(
        private renderer: Renderer2,
        private route: ActivatedRoute,
        private router: Router,
        private blogsService: PreviousExpeditionsService,
        private animationsService: AnimationsService,
        private sanitizer: DomSanitizer
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
        if (blog?.content !== undefined)
            for (const contentElement of blog!.content!) {
                this.blogContent.push({
                    title: contentElement.title,
                    content: this.sanitizer.bypassSecurityTrustHtml(contentElement.text),
                    images: contentElement.images
                })
            }
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
            let final_src = `images/${ this.blog.id }/${ src }`
            image.src = final_src;
            this.animationsService.addObservableElement(image);
            columns.item(index)!.appendChild(image);

            await sleep(10);
        }
    }

    getMonth() {
        let date = Number(this.blog.date.split('.')[1]);
        const months = ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'ноя', 'дек'];
        return months[date - 1];
    }

    getDate() {
        return this.blog.date.split('.')[0];
    }

    getElementTag(element: SafeHtml): string {
        if (!element) return '';

        const htmlString = element.toString();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        const firstElement = tempDiv.firstElementChild;

        return firstElement?.tagName?.toLowerCase() || '';
    }
}


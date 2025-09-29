import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    OnDestroy,
    QueryList,
    Renderer2,
    signal,
    ViewChild
} from '@angular/core';
import {BlogPost} from '../../../models/blog-post.model';
import {BlogsService} from '../../../services/blogs';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimationsService} from '../../../services/animations';
import {SplitHeading} from '../../../directives/split-heading';

@Component({
    selector: 'app-blog',
    imports: [
        SplitHeading
    ],
    templateUrl: './blog.html',
    styleUrl: './blog.css'
})
export class Blog implements AfterViewInit, OnDestroy {
    @ViewChild('gallery') galleryContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('bigScreenContent') bigScreenContent!: ElementRef<HTMLDivElement>;
    @ViewChild('smallScreenContent') smallScreenContent!: ElementRef<HTMLDivElement>;
    blog!: BlogPost;

    private galleryColumns = 0;

    private contentLoaded = signal<boolean>(false);
    private contentGenerated = signal<boolean>(false);
    public blogLoaded = signal<boolean>(false);

    constructor(
        private renderer: Renderer2,
        private route: ActivatedRoute,
        private router: Router,
        private blogsService: BlogsService,
        private animationsService: AnimationsService
    ) {
        effect(() => {
            const blogs = this.blogsService.blogs();
            if (blogs.length > 0) this.getBlog();
        });
        effect(() => {
            const loaded = this.contentGenerated();
            if (loaded) {
                setTimeout(() => {
                    this.animationsService.loadObserver();
                })
            }
        })
        effect(() => {
            const loaded = this.contentLoaded() && this.blogLoaded();
            if (loaded) {
                setTimeout(() => {
                    addEventListener('resize', () => {
                        this.setImages();
                    });
                    this.setImages();
                    this.generateSmallScreenContent();
                    this.generateBigScreenContent();
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
            this.router.navigate(['blogs']);
        this.blog = blog!;
        this.blogLoaded.set(true);
    }

    async setImages() {
        const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

        const windowWidth = window.innerWidth;
        let columnsCount = 0;

        if (windowWidth < 652) columnsCount = 1;
        else if (windowWidth < 1004) columnsCount = 2;
        else columnsCount = 3;

        if (columnsCount === this.galleryColumns) return;
        this.galleryColumns = columnsCount;

        const gallery = this.galleryContainer.nativeElement;
        gallery.innerHTML = "";

        await sleep(10);

        for (let i = 0; i < this.galleryColumns; i++) {
            const col = this.renderer.createElement('div');
            col.style.width = `calc((100% - 20px * ${this.galleryColumns - 1}) / ${this.galleryColumns})`;
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

    generateBigScreenContent() {
        const bigContainer = this.bigScreenContent.nativeElement;

        let index = 1;
        for (const blogContent of this.blog.content) {
            const textDiv = this.renderer.createElement('div');
            this.animationsService.addObservableElement(textDiv);
            textDiv.classList.add('text-container');
            textDiv.classList.add('slideX');
            const title = this.renderer.createElement('p');
            title.classList.add('title');
            title.innerHTML = blogContent.title;
            textDiv.appendChild(title);
            const text = this.renderer.createElement('p');
            text.classList.add('text');
            text.innerHTML = blogContent.text;
            textDiv.appendChild(text);

            const imageDiv = this.renderer.createElement('div');
            imageDiv.classList.add('slideX')
            this.animationsService.addObservableElement(imageDiv);
            if (index === 1) imageDiv.classList.add('image1-container')
            else imageDiv.classList.add('image2-container');
            for (let i = 0; i < 2 - index; i++) {
                const image = this.renderer.createElement('img');
                image.src = blogContent.images[i];
                imageDiv.appendChild(image);
            }

            if (index == 0) {
                bigContainer.appendChild(textDiv);
                bigContainer.appendChild(imageDiv);
            } else {
                bigContainer.appendChild(imageDiv);
                bigContainer.appendChild(textDiv);
            }

            index = (index + 1) % 2;
        }

        this.contentGenerated.set(true);
    }

    generateSmallScreenContent() {
        const smallContainer = this.smallScreenContent.nativeElement;

        let index = 1;
        for (const blogContent of this.blog.content) {
            const textDiv = this.renderer.createElement('div');
            textDiv.classList.add('text-container');
            const title = this.renderer.createElement('p');
            title.classList.add('title');
            title.innerHTML = blogContent.title;
            textDiv.appendChild(title);
            const text = this.renderer.createElement('p');
            text.classList.add('text');
            text.innerHTML = blogContent.text;
            textDiv.appendChild(text);

            const imageDiv = this.renderer.createElement('div');
            imageDiv.classList.add('image1-container')
            const image = this.renderer.createElement('img');
            image.src = blogContent.images[0];
            imageDiv.appendChild(image);

            smallContainer.appendChild(imageDiv);
            smallContainer.appendChild(textDiv);

            index = (index + 1) % 2;
        }
    }
}

import { AfterViewInit, Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpeditionPost } from '../../../models/expedition-post.model';
import { FutureExpeditionsService } from '../../../services/future-expeditions';

@Component({
    selector: 'app-expedition',
    imports: [],
    templateUrl: './expedition.html',
    styleUrl: './expedition.css'
})
export class Expedition implements AfterViewInit {
    blog!: ExpeditionPost;
    content = signal<string[]>([]);

    windowWidth = signal<number>(1000);

    blogs = signal<ExpeditionPost[]>([]);

    private contentLoaded = signal<boolean>(false);
    public blogLoaded = signal<boolean>(false);

    @ViewChild('blogContent') blogContent!: ElementRef<HTMLParagraphElement>;
    @ViewChild('showMoreButton') showMoreButton!: ElementRef<HTMLParagraphElement>;

    constructor(
        private blogsService: FutureExpeditionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        effect(() => {
            const blogs = this.blogsService.blogs();
            if (blogs.length > 0) this.getBlog();
        });
        effect(() => {
            const blogLoaded = this.blogLoaded();
            if (blogLoaded) {
                const blog_content = this.blog.content;
                let new_content = [];
                for (const item of blog_content) {
                    const arr = item.text.split('<br>');
                    new_content.push(...arr);
                }
                this.content.set(new_content);
            }
        });
    }

    ngAfterViewInit() {
        this.contentLoaded.set(true);
        addEventListener('resize', () => {
            this.windowWidth.set(window.innerWidth);
        });
    }

    getBlog() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const blog = this.blogsService.getBlog(id);
        if (blog === undefined)
            this.router.navigate(['blogs']);
        this.blog = blog!;
        this.blogLoaded.set(true);
    }

    isLoaded() {
        return this.blogLoaded() && this.contentLoaded();
    }

    showMore() {
        this.showMoreButton.nativeElement.style.display = 'none';
        this.blogContent.nativeElement.style.webkitLineClamp = 'unset';
    }
}

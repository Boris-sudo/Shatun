import {
    AfterViewInit,
    Component, effect, signal
} from '@angular/core';
import { ExpeditionPost } from '../../../models/expedition-post.model';
import { FutureExpeditionsService } from '../../../services/future-expeditions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-expedition',
    imports: [],
    templateUrl: './expedition.html',
    styleUrl: './expedition.css'
})
export class Expedition implements AfterViewInit {
    blog!: ExpeditionPost;

    windowWidth = signal<number>(1000);

    blogs = signal<ExpeditionPost[]>([]);

    private contentLoaded = signal<boolean>(false);
    public blogLoaded = signal<boolean>(false);

    constructor(
        private blogsService: FutureExpeditionsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        effect(() => {
            const blogs = this.blogsService.blogs();
            if (blogs.length > 0) this.getBlog();
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
}

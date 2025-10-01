import {AfterViewInit, Component, effect, ElementRef, OnDestroy, Renderer2, signal, ViewChild} from '@angular/core';
import {SplitHeading} from '../../directives/split-heading';
import {BlogPost} from '../../models/blog-post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogsService} from '../../services/blogs';
import {AnimationsService} from '../../services/animations';
import {ImagesService} from '../../services/images';

@Component({
  selector: 'app-gallery',
    imports: [
        SplitHeading
    ],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery implements AfterViewInit, OnDestroy {
    @ViewChild('gallery') galleryContainer!: ElementRef<HTMLDivElement>;

    galleryColumns = 0;

    public imagesLoaded = signal<boolean>(false);
    public contentLoaded = signal<boolean>(false);

    constructor(
        private renderer: Renderer2,
        private imagesService: ImagesService,
        private animationsService: AnimationsService
    ) {
        effect(() => {
            const loaded = this.contentLoaded() && this.imagesLoaded();
            setTimeout(() => {
                if (loaded) this.setImages();
            })
        });
        effect(() => {
            const images = this.imagesService.images();
            if (images.length !== 0) this.imagesLoaded.set(true);
        });
    }

    ngAfterViewInit() {
        this.contentLoaded.set(true);
        addEventListener('resize', () => {
            const loaded = this.contentLoaded() && this.imagesLoaded();
            if (loaded) this.setImages();
        })
    }

    ngOnDestroy() {
        this.animationsService.destroyObserver();
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
        for (const src of this.imagesService.images()) {
            let index = 0;
            for (let i = 0; i < columns.length; i++)
                if (columns.item(i)!.getBoundingClientRect().height < columns.item(index)!.getBoundingClientRect().height)
                    index = i;

            const image = this.renderer.createElement('img');
            image.src = src;
            this.animationsService.addObservableElement(image);
            columns.item(index)!.appendChild(image);

            await sleep(100);
        }
    }
}

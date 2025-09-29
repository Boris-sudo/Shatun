import {AfterViewInit, Component, ElementRef, QueryList, viewChild, ViewChild, ViewChildren} from '@angular/core';
import {UtilsService} from '../../services/utils';
import {BlogsService} from '../../services/blogs';
import {Router} from '@angular/router';

@Component({
    selector: 'HomePage',
    imports: [],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home implements AfterViewInit {
    @ViewChild('banner') banner!: ElementRef<HTMLDivElement>;
    @ViewChildren('parallax') parallaxImages!: QueryList<ElementRef<HTMLDivElement>>;

    @ViewChild('roller') roller!: ElementRef<HTMLDivElement>;
    @ViewChild('rollerContent') rollerContent!: ElementRef<HTMLDivElement>;

    rollerPosition: number = 1;
    rollerMax: number = 5;

    constructor(
        private blogsService: BlogsService,
        private utilsService: UtilsService,
        private router: Router,
    ) {
        const screen_width = window.innerWidth;
        if (screen_width < 600) this.rollerMax = 6;
        else if (screen_width < 1200) this.rollerMax = 5;
        else if (screen_width < 1980) this.rollerMax = 4;
    }

    ngAfterViewInit() {
        addEventListener('scroll', () => this.parallaxImagesListener());

        this.utilsService.homeBannerHeight.set(this.banner.nativeElement.getBoundingClientRect().height);
    }

    parallaxImagesListener() {
        if (this.banner === undefined) return;

        const top = window.scrollY;
        const max = this.banner.nativeElement.offsetHeight;
        const percent = top / max;
        this.parallaxImages.forEach(image => {
            const max_move = Number(image.nativeElement.getAttribute('parallaxMove'));
            const current_move = percent * max_move;
            image.nativeElement.style.transform = `translateY(${current_move}${max_move === 100 ? '%' : 'vh'})`;
        })
    }

    scrollTo(id: string) {
        const top = document.getElementById(id)!.getBoundingClientRect().top;
        scrollTo({
            top: top,
            behavior: 'smooth',
        })
    }

    private getRollerTransform() {
        const currentTransformString = this.roller.nativeElement.style.transform;
        let currentTransform: number = 0;
        if (currentTransformString === '') currentTransform = 0;
        else {
            currentTransform = Number(currentTransformString.split('(')[1].split('px')[0]);
            if (currentTransform < 0) currentTransform *= -1;
        }
        return currentTransform
    }

    rollerNext() {
        if (this.rollerPosition === this.rollerMax) return;

        const cards = this.rollerContent.nativeElement.querySelectorAll('.card');
        const card_width = cards.item(0).getBoundingClientRect().width;
        const gap = 40;
        const currentTransform = this.getRollerTransform();

        const transform = currentTransform + card_width + gap;
        this.roller.nativeElement.style.transform = `translateX(-${transform}px)`;

        this.rollerPosition++;
    }

    rollerPrev() {
        if (this.rollerPosition === 1) return;

        const cards = this.rollerContent.nativeElement.querySelectorAll('.card');
        const card_width = cards.item(0).getBoundingClientRect().width;
        const gap = 40;
        const currentTransform = this.getRollerTransform();

        const transform = currentTransform - card_width - gap;
        this.roller.nativeElement.style.transform = `translateX(-${transform}px)`;

        this.rollerPosition--;
    }

    rollerScroll(event: MouseEvent | TouchEvent) {
        let cur = (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX);
        const cards = this.rollerContent.nativeElement.querySelectorAll('.card');
        const card_width = cards.item(0).getBoundingClientRect().width;
        const gap = 40;
        const maxTransform = (this.rollerMax - 1) * (card_width + gap);


        function disableScroll() {
            addEventListener('wheel', preventScroll, {passive: false});
            addEventListener('touchmove', preventScroll, {passive: false});
        }

        function enableScroll() {
            removeEventListener('wheel', preventScroll);
            removeEventListener('touchmove', preventScroll);
        }

        function preventScroll(e: Event) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        const move = (event: MouseEvent | TouchEvent) => {
            const x = (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX);
            const delta = cur - x;
            cur = x;
            const currentTransform = this.getRollerTransform();
            const transform = Math.min(maxTransform, currentTransform + delta);
            this.roller.nativeElement.style.transform = `translateX(-${transform}px)`;
        };
        const moveEnd = () => {
            enableScroll();
            removeEventListener('mousemove', move);
            removeEventListener('touchmove', move);
            removeEventListener('touchend', moveEnd);
            removeEventListener('mouseup', moveEnd);
            this.roller.nativeElement.style.transitionDuration = '.6s';
            setTimeout(() => {
                let currentTransform = this.getRollerTransform();
                let transformIndex = 0;
                let transform = 0;
                for (let i = 0; i < this.rollerMax; i++) {
                    const newTransform = i * (gap + card_width);
                    if (Math.abs(transform - currentTransform) > Math.abs(newTransform - currentTransform))
                        transform = newTransform, transformIndex = i + 1;
                }
                this.rollerPosition = transformIndex;
                this.roller.nativeElement.style.transform = `translateX(-${transform}px)`;
            });
        };

        this.roller.nativeElement.style.transitionDuration = '0s';
        disableScroll();
        addEventListener('touchmove', move);
        addEventListener('mousemove', move);
        addEventListener('touchend', moveEnd);
        addEventListener('mouseup', moveEnd);
    }

    redirectTo(url: string) {
        this.router.navigate([url]);
    }

    protected readonly String = String;
}

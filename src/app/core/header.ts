import {AfterViewInit, Component, effect, ElementRef, HostListener, ViewChild} from '@angular/core';
import {SidebarInteractionService} from '../services/sidebar-interaction';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {filter} from 'rxjs';
import {UtilsService} from '../services/utils';

@Component({
    selector: 'HeaderComp',
    imports: [
        RouterLink
    ],
    styles: `
        .container {
            position:            fixed;
            width:               100%;
            height:              var(--header-big-height);
            display:             flex;
            flex-direction:      row;
            justify-content:     space-between;
            align-items:         center;
            transition-duration: .3s;
            padding:             0 32px;
            z-index:             10000;
            border-bottom:       1px solid transparent;
            overflow:            hidden;

            @media screen and (max-width: 600px) {
                padding: 10px 16px;
            }

            .logo {
                height:         100%;
                display:        flex;
                flex-direction: row;
                align-items:    center;
                color:          var(--background-primary);

                img {
                    transition-duration: .3s;
                    cursor:              pointer;
                    user-select:         none;
                    height:              100%;
                }

                p {
                    transition-duration: .3s;
                    font-weight:         700;
                    cursor:              pointer;
                    user-select:         none;
                }
            }

            .menu-icon {
                display:        flex;
                flex-direction: row;
                align-items:    center;
                gap:            16px;
                padding:        0 10px;
                height:         52px;
                background:     var(--background-secondary);
                border-radius:  var(--br-8);
                cursor:         pointer;
                transition:     .5s cubic-bezier(.3, .86, .36, .95);
                animation:      menu-icon-appear .5s forwards ease-in-out;
                opacity:        0.5;
                color:          var(--text-primary);

                @media screen and (max-width: 600px) {
                    padding: 0 8px;
                    height:  40px;
                    gap:     10px;

                    &:hover {
                        padding: 0 10px !important;
                        gap:     16px !important;
                    }
                }

                p {
                    font-weight: 500;
                    user-select: none;
                    font-size:   16px;

                    @media screen and (max-width: 600px) {
                        font-size: 14px;
                    }
                }

                .lines {
                    height:          100%;
                    display:         flex;
                    flex-direction:  column;
                    gap:             6px;
                    justify-content: center;

                    .line {
                        transition:    .5s cubic-bezier(.3, .86, .36, .95);
                        width:         36px;
                        height:        2px;
                        border-radius: var(--br-100);
                        background:    var(--background-neutral);
                    }
                }

                &:hover {
                    padding:    0 25px;
                    gap:        24px;
                    background: var(--background-neutral);
                    color:      var(--background-primary);

                    .line {
                        background: var(--background-primary) !important;
                    }
                }

                &.active {
                    background: var(--background-neutral);
                    color:      var(--background-primary);

                    .line {
                        width:      20px;
                        background: var(--background-primary) !important;

                        &:nth-child(1) {
                            transform: translateY(4px) rotate(45deg);
                        }

                        &:nth-child(2) {
                            transform: translateY(-4px) rotate(-45deg);
                        }
                    }
                }
            }

            &::after {
                content:             '';
                background:          rgba(from var(--background-secondary) r g b / 60%);
                backdrop-filter:     blur(5px);
                position:            absolute;
                left:                0;
                bottom:              -100%;
                width:               100%;
                height:              100%;
                z-index:             -1;
                transition-duration: .6s;
            }

            &.sidebar-opened {
                border-bottom-color: var(--background-secondary);


                &::after {
                    bottom: 0;
                }
            }

            &.bg {
                background-color: var(--background-primary);
                border-bottom:    1px solid var(--background-secondary);
            }

            &:not(.small) {
                .logo {
                    img {
                        height: 60px;

                        @media screen and (max-width: 600px) {
                            height: 50px;
                        }
                    }
                }
            }

            &.small {
                height:           var(--header-small-height) !important;
                background-color: var(--background-primary);
                border-bottom:    1px solid var(--background-secondary);

                .logo {
                    img {
                        height: 45px;

                        @media screen and (max-width: 600px) {
                            height: 40px;
                        }
                    }
                }
            }
        }
    `,
    template: `
        <div class="container" #container>
            <div routerLink="/" class="logo">
                <img src="logo.png" alt="sperm">
            </div>
            <div (click)="interactionToggle()" class="menu-icon" #menuIcon>
                <p #menuIconText>меню</p>
                <div class="lines">
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </div>
        </div>
    `
})
export class Header implements AfterViewInit {
    @ViewChild('container') container!: ElementRef<HTMLDivElement>;
    @ViewChild('menuIcon') menuIcon!: ElementRef<HTMLDivElement>;
    @ViewChild('menuIconText') menuIconText!: ElementRef<HTMLParagraphElement>;

    private isHome: boolean = false;

    constructor(
        private sidebarInteractionService: SidebarInteractionService,
        private utilsService: UtilsService,
        private router: Router,
    ) {
        effect(() => {
            const status = this.sidebarInteractionService.status();
            if (status) this.Open();
            else this.Close();
        });
    }

    ngAfterViewInit() {
        this.onScroll();
        addEventListener('scroll', () => this.onScroll());
    }

    interactionToggle(): void {
        this.sidebarInteractionService.toggle();
    }

    Open() {
        if (this.menuIconText === undefined) return;

        this.menuIconText.nativeElement.innerHTML = 'закрыть';
        this.container.nativeElement.classList.add('sidebar-opened');

        setTimeout(() => {
            this.menuIcon.nativeElement.style.background = 'var(--text-secondary)';
            this.menuIconText.nativeElement.style.color = 'var(--background-secondary)';
        }, 600)
    }

    Close() {
        if (this.menuIconText === undefined) return;

        this.menuIconText.nativeElement.innerHTML = 'меню';
        this.menuIcon.nativeElement.style.background = '';
        this.menuIconText.nativeElement.style.color = '';

        setTimeout(() => {
            this.container.nativeElement.classList.remove('sidebar-opened');
        }, 600)
    }

    onScroll() {
        if (this.container === undefined) return;

        const top = window.scrollY;
        if (top > 0)
            this.container.nativeElement.classList.add('small')
        else
            this.container.nativeElement.classList.remove('small')
    }
}

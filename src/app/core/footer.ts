import {Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'FooterComp',
    imports: [
        RouterLink
    ],
    styles: `
        .container {
            display:        flex;
            flex-direction: column;
            height:         500px;
            background:     var(--text-primary);
            color:          var(--background-primary);
            position:       relative;
            z-index:        2;
        }

        .grid-container {
            height:                100%;
            display:               grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);

            @media screen and (max-width: 1000px) {
                grid-template-columns: repeat(1, 1fr);
                grid-template-rows: repeat(2, 1fr);

                .links-container {
                    display: none;
                }

                .contact-container {
                    display: none;
                }
            }

            div {
                width:   100%;
                height:  100%;
                display: flex;
            }
        }

        .links-container {
            grid-row:        span 2;
            grid-column:     span 1;
            align-items:     flex-start;
            justify-content: flex-start;
            align-content:   flex-start;
            padding:         32px;
            flex-direction:  row;
            flex-wrap:       wrap;
            gap:             20px;

            .link {
                width:          fit-content;
                height:         20px;
                border-radius:  var(--br-8);
                padding:        8px 52px 8px 16px;
                border:         2px solid var(--background-primary);
                display:        flex;
                flex-direction: column;
                gap:            20px;
                box-sizing:     content-box;
                overflow:       hidden;
                cursor:         pointer;
                position:       relative;

                svg {
                    width:               20px;
                    height:              20px;
                    position:            absolute;
                    right:               16px;
                    top:                 50%;
                    transform:           translateY(-50%);
                    transition-duration: .3s;
                    transform-origin:    center;
                }

                a {
                    font-size:           20px;
                    font-weight:         700;
                    line-height:         20px;
                    transition-duration: .3s;
                }

                &:hover {
                    a {
                        transform: translateY(-40px);
                    }

                    svg {
                        transform: rotate(90deg) translateX(-9px);
                    }
                }
            }
        }

        .logo-container {
            grid-row:        span 1;
            grid-column:     span 1;
            align-items:     center;
            justify-content: center;
            flex-direction:  column;

            p {
                cursor:              pointer;
                font-size:           4em;
                font-weight:         800;
                font-family:         var(--ff-noto), sans-serif;
                transition-duration: .3s;

                &:hover {
                    color: var(--background-accent);
                }
            }
        }

        .contact-container {
            grid-row:       span 2;
            grid-column:    span 1;
            flex-direction: column;
            height:         100%;
            width:          100%;
            display:        flex;
        }

        .media-container {
            grid-row:        span 2;
            grid-column:     span 1;
            align-items:     center;
            justify-content: center;
            gap:             20px;
            flex-direction:  column;

            .media {
                height:          fit-content;
                display:         flex;
                flex-direction:  row;
                align-items:     center;
                justify-content: center;
                gap:             30px;
            }

            p {
                text-align:  center;
                font-size:   20px;
                font-weight: 600;
            }

            a {
                width:               40px;
                padding:             8px;
                cursor:              pointer;
                aspect-ratio:        1/1;
                background:          var(--text-primary);
                color:               var(--background-primary);
                border-radius:       var(--br-100);
                display:             flex;
                align-items:         center;
                justify-content:     center;
                transition-duration: .6s;

                svg {
                    width: 100%;
                }

                &:hover {
                    background: var(--background-accent);
                    color:      var(--background-primary);
                }
            }
        }

        .certificates-container {
            border-top: 1px solid var(--background-secondary);
            display:    flex;
            height:     100px;
        }
    `,
    template: `
        <div class="container">
            <div class="grid-container">
                <div class="links-container">
                    <div (click)="redirectTo('home')" class="link">
                        <a>Главная</a>
                        <a>Главная</a>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 9" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.59378 1.68719C2.45551 1.68719 2.3229 1.64477 2.22513 1.56928C2.12735 1.49379 2.07243 1.3914 2.07243 1.28463C2.07243 1.17787 2.12735 1.07548 2.22513 0.999985C2.3229 0.924492 2.45551 0.88208 2.59378 0.88208H8.85007C8.98835 0.88208 9.12096 0.924492 9.21873 0.999985C9.3165 1.07548 9.37143 1.17787 9.37143 1.28463V6.11526C9.37143 6.22203 9.3165 6.32442 9.21873 6.39991C9.12096 6.47541 8.98835 6.51782 8.85007 6.51782C8.7118 6.51782 8.57919 6.47541 8.48142 6.39991C8.38364 6.32442 8.32872 6.22203 8.32872 6.11526V2.25613L0.876779 8.00995C0.777947 8.08105 0.647227 8.11976 0.51216 8.11792C0.377093 8.11608 0.248224 8.07384 0.152702 8.00008C0.0571803 7.92633 0.00246433 7.82682 8.12257e-05 7.72254C-0.00230188 7.61825 0.0478339 7.51732 0.139927 7.441L7.59186 1.68719H2.59378Z" fill="currentColor"></path></svg>
                    </div>
                    <div (click)="redirectTo('blogs')" class="link">
                        <a>Блоги</a>
                        <a>Блоги</a>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 9" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.59378 1.68719C2.45551 1.68719 2.3229 1.64477 2.22513 1.56928C2.12735 1.49379 2.07243 1.3914 2.07243 1.28463C2.07243 1.17787 2.12735 1.07548 2.22513 0.999985C2.3229 0.924492 2.45551 0.88208 2.59378 0.88208H8.85007C8.98835 0.88208 9.12096 0.924492 9.21873 0.999985C9.3165 1.07548 9.37143 1.17787 9.37143 1.28463V6.11526C9.37143 6.22203 9.3165 6.32442 9.21873 6.39991C9.12096 6.47541 8.98835 6.51782 8.85007 6.51782C8.7118 6.51782 8.57919 6.47541 8.48142 6.39991C8.38364 6.32442 8.32872 6.22203 8.32872 6.11526V2.25613L0.876779 8.00995C0.777947 8.08105 0.647227 8.11976 0.51216 8.11792C0.377093 8.11608 0.248224 8.07384 0.152702 8.00008C0.0571803 7.92633 0.00246433 7.82682 8.12257e-05 7.72254C-0.00230188 7.61825 0.0478339 7.51732 0.139927 7.441L7.59186 1.68719H2.59378Z" fill="currentColor"></path></svg>
                    </div>
                    <div (click)="redirectTo('future')" class="link">
                        <a>Будущие походы</a>
                        <a>Будущие походы</a>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 9" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.59378 1.68719C2.45551 1.68719 2.3229 1.64477 2.22513 1.56928C2.12735 1.49379 2.07243 1.3914 2.07243 1.28463C2.07243 1.17787 2.12735 1.07548 2.22513 0.999985C2.3229 0.924492 2.45551 0.88208 2.59378 0.88208H8.85007C8.98835 0.88208 9.12096 0.924492 9.21873 0.999985C9.3165 1.07548 9.37143 1.17787 9.37143 1.28463V6.11526C9.37143 6.22203 9.3165 6.32442 9.21873 6.39991C9.12096 6.47541 8.98835 6.51782 8.85007 6.51782C8.7118 6.51782 8.57919 6.47541 8.48142 6.39991C8.38364 6.32442 8.32872 6.22203 8.32872 6.11526V2.25613L0.876779 8.00995C0.777947 8.08105 0.647227 8.11976 0.51216 8.11792C0.377093 8.11608 0.248224 8.07384 0.152702 8.00008C0.0571803 7.92633 0.00246433 7.82682 8.12257e-05 7.72254C-0.00230188 7.61825 0.0478339 7.51732 0.139927 7.441L7.59186 1.68719H2.59378Z" fill="currentColor"></path></svg>
                    </div>
                    <div (click)="redirectTo('gallery')" class="link">
                        <a>Галлерея</a>
                        <a>Галлерея</a>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 9" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.59378 1.68719C2.45551 1.68719 2.3229 1.64477 2.22513 1.56928C2.12735 1.49379 2.07243 1.3914 2.07243 1.28463C2.07243 1.17787 2.12735 1.07548 2.22513 0.999985C2.3229 0.924492 2.45551 0.88208 2.59378 0.88208H8.85007C8.98835 0.88208 9.12096 0.924492 9.21873 0.999985C9.3165 1.07548 9.37143 1.17787 9.37143 1.28463V6.11526C9.37143 6.22203 9.3165 6.32442 9.21873 6.39991C9.12096 6.47541 8.98835 6.51782 8.85007 6.51782C8.7118 6.51782 8.57919 6.47541 8.48142 6.39991C8.38364 6.32442 8.32872 6.22203 8.32872 6.11526V2.25613L0.876779 8.00995C0.777947 8.08105 0.647227 8.11976 0.51216 8.11792C0.377093 8.11608 0.248224 8.07384 0.152702 8.00008C0.0571803 7.92633 0.00246433 7.82682 8.12257e-05 7.72254C-0.00230188 7.61825 0.0478339 7.51732 0.139927 7.441L7.59186 1.68719H2.59378Z" fill="currentColor"></path></svg>
                    </div>
                </div>
                <div class="logo-container">
                    <p routerLink="home">Shatun</p>
                </div>
                <div class="contact-container">
                </div>
                <div class="media-container">
                    <p>Следите за нами в социальных сетях</p>
                    <div class="media">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="icon icon-tabler icons-tabler-outline icon-tabler-brand-vk">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M14 19h-4a8 8 0 0 1 -8 -8v-5h4v5a4 4 0 0 0 4 4h0v-9h4v4.5l.03 0a4.531 4.531 0 0 0 3.97 -4.496h4l-.342 1.711a6.858 6.858 0 0 1 -3.658 4.789h0a5.34 5.34 0 0 1 3.566 4.111l.434 2.389h0h-4a4.531 4.531 0 0 0 -3.97 -4.496v4.5z"/>
                            </svg>
                        </a>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                 class="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"/>
                            </svg>
                        </a>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 class="icon icon-tabler icons-tabler-filled icon-tabler-mail-opened">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M14.872 14.287l6.522 6.52a2.996 2.996 0 0 1 -2.218 1.188l-.176 .005h-14a2.995 2.995 0 0 1 -2.394 -1.191l6.521 -6.522l2.318 1.545l.116 .066a1 1 0 0 0 .878 0l.116 -.066l2.317 -1.545z"/>
                                <path d="M2 9.535l5.429 3.62l-5.429 5.43z"/>
                                <path d="M22 9.535v9.05l-5.43 -5.43z"/>
                                <path
                                    d="M12.44 2.102l.115 .066l8.444 5.629l-8.999 6l-9 -6l8.445 -5.63a1 1 0 0 1 .994 -.065z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="certificates-container"></div>
        </div>
    `
})
export class Footer {

    constructor(
        private router: Router
    ) {
    }

    redirectTo(url: string) {
        window.scrollTo(0,0);
        setTimeout(() => {
            this.router.navigate([url]).then();
        })
    }
}

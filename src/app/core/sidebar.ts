import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'HeaderComp',
  imports: [],
  styles: `
      .container {
          position:            fixed;
          width:               100%;
          height:              var(--header-big-height);
          display:             flex;
          flex-direction:      row;
          justify-content:     space-between;
          align-items:         center;
          background:          white;
          transition-duration: .3s;
          padding:             0 32px;
          z-index: 10000;

          .logo {
              display:        flex;
              flex-direction: row;
              align-items:    center;

              p {
                  font-size:   30px;
                  font-weight: 700;
              }
          }

          .menu-icon {
              display:        flex;
              flex-direction: row;
              align-items:    center;
              gap:            16px;
              padding:        15px 10px;
              height:         52px;
              background:     var(--background-secondary);
              border-radius:  var(--br-8);
              cursor:         pointer;
              transition:     .5s cubic-bezier(.3, .86, .36, .95);
              animation:      menu-icon-appear .5s forwards ease-in-out;
              opacity:        0.5;
              color: var(--text-primary);

              p {
                  font-weight: 500;
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
                  padding:    15px 25px;
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

          &.small {
              height: var(--header-small-height) !important;
          }
      }
  `,
  template: `
    <div class="container" #container>
        <div class="logo">
            <p>Shatun</p>
        </div>
        <div class="menu-icon">
            <p>menu</p>
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

    ngAfterViewInit() {
        addEventListener('scroll', () => this.onScroll());
    }

    onScroll() {
        const top = window.scrollY;
        if (top > 0) {
            this.container.nativeElement.classList.add('small')
        } else {
            this.container.nativeElement.classList.remove('small')
        }
    }
}

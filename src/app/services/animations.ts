import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnimationsService {

    observer: any = null;

    constructor(
    ) {
    }

    loadObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0, rootMargin: '0px 0px -20% 0px' })
    }

    addObservableElement(element: Element) {
        if (this.observer === null) this.loadObserver();
        this.observer.observe(element);
    }

    destroyObserver() {
        this.observer.disconnect();
    }
}

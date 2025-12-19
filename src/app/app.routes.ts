import { Routes } from '@angular/router';
import { Certificates } from './pages/certificates/certificates';
import { Home } from './pages/home/home';
import { FutureExpeditions } from './pages/future-expeditions/future-expeditions';
import { Blogs } from './pages/previous-expeditions/blogs';
import { Gallery } from './pages/gallery/gallery';
import { Expedition } from './pages/future-expeditions/expedition/expedition';
import { Blog } from './pages/previous-expeditions/blog/blog';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'gallery', component: Gallery },
    { path: 'certificates', component: Certificates },

    { path: 'futures', component: FutureExpeditions },
    { path: 'expedition/:id', component: Expedition },

    { path: 'blogs', component: Blogs },
    { path: 'blog/:id', component: Blog },

    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

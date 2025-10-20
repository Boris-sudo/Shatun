import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FutureExpeditions } from './pages/future-expeditions/future-expeditions';
import { Blogs } from './pages/blogs/blogs';
import { Gallery } from './pages/gallery/gallery';
import { Expedition } from './pages/future-expeditions/expedition/expedition';
import { Blog } from './pages/blogs/blog/blog';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'gallery', component: Gallery },

    { path: 'futures', component: FutureExpeditions },
    { path: 'expedition/:id', component: Expedition },

    { path: 'blogs', component: Blogs },
    { path: 'blog/:id', component: Blog },

    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

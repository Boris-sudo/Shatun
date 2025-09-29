import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blogs } from './pages/blogs/blogs';
import { Future } from './pages/future/future';
import { Gallery } from './pages/gallery/gallery';
import { Blog } from './pages/blogs/blog/blog';
import { FutureBlog } from './pages/future/future-blog/future-blog';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'gallery', component: Gallery },

    { path: 'blogs', component: Blogs },
    { path: 'blog/:id', component: Blog },

    { path: 'futures', component: Future },
    { path: 'future/:id', component: FutureBlog },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

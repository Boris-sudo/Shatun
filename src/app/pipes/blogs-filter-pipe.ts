import { Pipe, PipeTransform } from '@angular/core';
import { ExpeditionPost } from '../models/expedition-post.model';

@Pipe({
    name: 'blogsFilter'
})
export class BlogsFilterPipe implements PipeTransform {

    transform(value: ExpeditionPost[], ...filter: any[]): ExpeditionPost[] {
        return value.filter((blog: ExpeditionPost) => {
            if (filter[0] !== "all" && Number(blog.date.split('.')[2]) !== Number(filter[0])) return false;
            if (blog.title.toLowerCase().indexOf(filter[1].toLowerCase()) === -1) return false;
            return true;
        });
    }

}

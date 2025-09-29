export interface  BlogPost {
    id: number;
    title: string;
    small_content: string;
    content: BlogContent[];
    preview: string;
    images: string[];
    year: number;
}

export interface BlogContent {
    title: string;
    text: string;
    images: string[];
}

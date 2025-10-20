export interface ExpeditionPost {
    id: number;
    title: string;
    small_content: string;
    content: ExpeditionContent[];
    tags: string[];
    titles: string[];
    preview: string;
    images: string[];
    date: number;
}

export interface ExpeditionContent {
    quote: string;
    text: string;
    images: string[];
}

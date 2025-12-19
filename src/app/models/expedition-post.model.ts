export interface ExpeditionPost {
    id: number;
    preview: string;
    title: string;
    images: string[];
    content: FutureExpeditionContent[];
    days: number;
    difficulty: number;
    distance: number;
    price: number;
    equipment: ExpeditionEquipment[];
    small_content: string;
    date: string;
}

export interface FutureExpeditionContent {
    text: string;
    images: string[];
    title: string;
}

export interface ExpeditionEquipment {
    name: string;
    description: string;
}

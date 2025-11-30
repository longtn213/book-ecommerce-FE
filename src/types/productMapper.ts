import { Book } from "@/types/book";

export function mapProduct(p: any): Book & {
    thumbnails: string[];
    previews: string[];
} {
    const images = p.images || [];

    return {
        ...p,
        thumbnails: images,
        previews: images,
    };
}

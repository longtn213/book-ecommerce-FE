import { Product } from "@/types/product";

export function mapProduct(p: any): Product & {
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

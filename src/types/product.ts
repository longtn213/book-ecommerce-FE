export type Product = {
    id: number;
    title: string;
    slug: string;
    isbn: string;
    description: string;
    price: number;
    stockQuantity: number;
    pages: number;
    language: string;
    publishYear: number;
    status: string;
    publisherName: string;
    authors: string[];
    categories: string[];
    images: string[];
    rating: number;
    reviewCount:number;
};

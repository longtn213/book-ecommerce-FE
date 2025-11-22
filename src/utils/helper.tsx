export const EyeIcon = ({isOpen}: { isOpen: boolean }) => (
    isOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg"
             className="w-5 h-5 text-gray-600"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274
4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg"
             className="w-5 h-5 text-gray-600"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478
0-8.268-2.943-9.542-7a9.97 9.97 0 012.293-3.95M6.1
6.1A9.967 9.967 0 0112 5c4.478 0 8.268
2.943 9.542 7a9.972 9.972 0 01-4.043
5.225M15 12a3 3 0 11-6 0"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3l18 18"/>
        </svg>
    )
);

export const convertBookToProduct = (b: any) => ({
    id: b.id,
    title: b.title,
    slug: b.slug || "",
    isbn: b.isbn || "",
    description: b.description || "",
    price: b.price,
    stockQuantity: b.stockQuantity || 0,
    pages: b.pages || 0,
    language: b.language || "",
    publishYear: b.publishYear || 0,
    status: b.status || "",
    publisherName: b.publisherName || "",
    authors: b.authors?.map((a: any) => a.name) || [],
    categories: b.categories?.map((c: any) => c.name) || [],
    images: b.images?.length ? b.images : ["/images/default-book.png"],
    rating: b.rating || 0,
    reviewCount: b.reviewCount || 0,
});


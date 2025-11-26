export type Testimonial = {
    review: string;        // comment
    authorName: string;    // fullName
    authorRole: string;    // sẽ để Customer (FE tự set)
    authorImg: string;     // avaUrl
    rating: number;        // BE có rating → thêm luôn
    createdAt: Date;
};
import { Review } from "@prisma/client";

// calculate review rating average
export const calculateReviewRatingAverage = (reviews: Review[]) => {
    if (reviews.length === 0) {
        return 0;
    }
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
    };
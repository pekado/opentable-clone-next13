import fullStar from '@/../public/icons/full-star.png'
import halfStar from '@/../public/icons/half-star.png'
import emptyStar from '@/../public/icons/empty-star.png'
import Image from 'next/image'
import { Review } from '@prisma/client'
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage'

function Stars({ reviews, rating }: { reviews: Review[], rating?: number }) {
    const reviewRating = rating || +calculateReviewRatingAverage(reviews)
    const renderStars = () => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= reviewRating) {
                stars.push(fullStar)
            } else if (i === Math.ceil(reviewRating) && !Number.isInteger(rating)) {
                stars.push(halfStar) 
            } else {
                stars.push(emptyStar)
            }
        }
        return stars
    }

    return (
        <>
            {renderStars().map((star, index) => (
                <Image
                    key={index}
                    src={star}
                    alt="star"
                    width={20}
                    height={20}
                />
            ))}
        </>
    )
}

export default Stars
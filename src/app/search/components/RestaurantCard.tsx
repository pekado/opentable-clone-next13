import { Cuisine, Location, PRICE, Review } from "@prisma/client"
import Price from "@/app/components/Price"
import Link from "next/link"
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage"
import Stars from "@/app/components/Stars"

interface Restaurant {
    id: number
    name: string
    slug: string
    main_image: string
    location: Location,
    cuisine: Cuisine,
    price: PRICE,
    reviews: Review[]
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
    const renderRatingText = () => {
        const rating = calculateReviewRatingAverage(restaurant.reviews)
        if (+rating === 0) return "No reviews"
        if (+rating <= 1) return "Terrible"
        if (+rating <= 2) return "Bad"
        if (+rating <= 3) return "Okay"
        if (+rating <= 4) return "Good"
        if (+rating <= 5) return "Awesome"
    }

    return (
        <div className="border-b flex pb-5">
            <img
                src={restaurant.main_image}
                alt=""
                className="w-44 rounded"
            />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.name}</h2>
                <div className="flex items-start">
                    <Stars reviews={restaurant.reviews} />
                    <p className="ml-2 text-sm">{renderRatingText()}</p>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <Price price={restaurant.price} />
                        <p className="mr-4">{restaurant.cuisine.name}</p>
                        <p className="mr-4">{restaurant.location.name}</p>
                    </div>
                </div>
                <Link href={`/restaurant/${restaurant.slug}`} >
                    <div className="text-red-600">
                        <a href="">View more information</a>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default RestaurantCard
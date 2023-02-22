import NavBar from "@/app/components/NavBar"
import Link from "next/link"
import Header from "./components/Header"
import RestaurantNavBar from "./components/RestaurantNavBar"
import Title from "./components/Title"
import Rating from "./components/Rating"
import Description from "./components/Description"
import Images from "./components/Images"
import Reviews from "./components/Reviews"
import ReservationCard from "./components/ReservationCard"
import { PrismaClient, Review } from "@prisma/client"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

interface Restaurant {
    id: number;
    name: string;
    description: string;
    slug: string;
    images: string[];
    reviews: Review[];
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            id: true,
            name: true,
            description: true,
            slug: true,
            images: true,
            reviews: true
        }
    })

    if (!restaurant) notFound()
    return restaurant
}

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {

    const restaurant = await fetchRestaurantBySlug(params.slug)
    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar slug={params.slug} />
                <Title title={restaurant.name} />
                <Rating reviews={restaurant.reviews} />
                <Description description={restaurant.description} />
                <Images images={restaurant.images} />
                <Reviews reviews={restaurant.reviews} />
            </div>
            <ReservationCard />
        </>

    )
}

export default RestaurantDetails 
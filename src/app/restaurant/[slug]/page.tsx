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

const RestaurantDetails = () => {
    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar />
                <Title />
                <Rating />
                <Description />
                <Images />
                <Reviews />
            </div>
            <ReservationCard />
        </>

    )
}

export default RestaurantDetails 
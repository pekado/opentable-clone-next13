import Header from "./components/Header"
import SearchSideBar from "./components/SearchSideBar"
import RestaurantCard from "./components/RestaurantCard"
import { PRICE, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface searchParams { city?: string, cuisine?: string, price?: PRICE }

const fetchRestaurants = (searchParams: searchParams) => {
    const select = {
        id: true,
        name: true,
        slug: true,
        main_image: true,
        location: true,
        cuisine: true,
        price: true,
        reviews: true
    }
    // Get the search parameters.
    const { city, cuisine, price } = searchParams

    // Build the where clause.
    const where: any = {}
    if (city) {
        where.location = {
            name: { equals: city.toLowerCase() }
        }
    }
    if (cuisine) {
        where.cuisine = {
            name: { equals: cuisine.toLowerCase() }
        }
    }
    if (price) {
        where.price = { equals: price }
    }

    // Get the restaurants.
    return prisma.restaurant.findMany({
        where,
        select
    })
}

const fetchLocations = async () => {
    const locations = await prisma.location.findMany({})
    if (!locations) throw new Error("No locations found")
    return locations
}

const fetchCuisines = async () => {
    const cuisines = await prisma.cuisine.findMany({})
    if (!cuisines) throw new Error("No cuisines found")
    return cuisines
}
async function Search({ searchParams }: { searchParams?: searchParams }) {
    const restaurants = await fetchRestaurants(searchParams || {})
    const locations = await fetchLocations()
    const cuisines = await fetchCuisines()

    return (
        <>
            <Header />
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                {/* @ts-expect-error Server Component */}
                <SearchSideBar cuisines={cuisines} locations={locations} searchParams={searchParams} />
                <div className="w-5/6">
                    {restaurants.length ?
                        <>
                            {restaurants.map((restaurant) => {
                                return (
                                    <RestaurantCard
                                        key={restaurant.slug}
                                        restaurant={restaurant}
                                    />
                                )
                            })
                            }
                        </> :
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">No restaurants found</h1>
                            <p className="text-lg">Try a different location</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Search
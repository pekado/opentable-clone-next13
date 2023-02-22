import RestaurantNavBar from "../components/RestaurantNavBar"
import Menu from "../components/Menu"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const fetchRestaurantMenu = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            items: true
        }
    })
    if (!restaurant) throw new Error("Restaurant not found")
    return restaurant?.items
}

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
    const menu = await fetchRestaurantMenu(params.slug)
    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavBar slug={params.slug} />
                <Menu menuItems={menu} />
            </div>
        </>


    )
}

export default RestaurantMenu
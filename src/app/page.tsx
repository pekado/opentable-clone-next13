import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { PrismaClient, Cuisine, Location, PRICE } from '@prisma/client'

export interface RestaurantCardProps {
  id: number
  name: string
  main_image: string
  cuisine: Cuisine
  price: PRICE
  location: Location,
  slug: string
}

const prisma = new PrismaClient()

const fetchRestaurants = async (): Promise<RestaurantCardProps[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      price: true,
      location: true,
      slug: true,
    }
  })
  return restaurants
}
export default async function Home() {

  const restaurants = await fetchRestaurants()

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  )
}

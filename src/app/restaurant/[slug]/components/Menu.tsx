import React from 'react'
import MenuCard from './MenuCard'
import { Item } from '@prisma/client'

function Menu({ menuItems }: { menuItems: Item[] }) {
    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                    {menuItems.length ? <>
                        {menuItems.map((item, index) => (
                            <MenuCard
                                key={item.id}
                                item={item}
                            />
                        ))}</> :
                        <div className="text-center w-full">
                            <h1 className="text-2xl font-bold">No menu items found</h1>
                        </div>
                    }
                </div>
            </div>
        </main>
    )
}

export default Menu
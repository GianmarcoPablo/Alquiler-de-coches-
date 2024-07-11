import React from 'react'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import ListCars from './components/list-cars/ListCarrs'

export default async function page() {

    const { userId } = auth()

    if (!userId) redirect("/")

    const cars = await db.car.findMany({
        where: {
            isPublished: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold'>Lista de coches</h2>
            </div>

            <ListCars cars={cars} />
        </div>
    )
}

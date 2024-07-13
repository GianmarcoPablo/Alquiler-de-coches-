import Navbar from "@/components/shared/Navbar"
import { db } from "@/lib/db"
import CarsHeader from "./components/CarsHeader"
import FiltersAndListCars from "./components/FiltersAndListCars"

export default async function page() {

    const cars = await db.car.findMany({
        where: {
            isPublished: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <>
            <Navbar />
            <div className="p-6 mx-auto max-w-7xl">
                <CarsHeader />
                <div>
                    <FiltersAndListCars
                        cars={cars}
                    />
                </div>
            </div>
        </>
    )
}

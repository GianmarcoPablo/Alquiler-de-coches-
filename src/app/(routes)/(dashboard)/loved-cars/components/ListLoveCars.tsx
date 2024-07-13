"use client"
import { useLovedCars } from "@/hooks/useLovedCars"
import { Car } from "@prisma/client"
import { Fuel, Heart, Users, Wrench, Gem, Gauge } from "lucide-react"
import ModalAddReservation from "@/components/shared/ModalAddReservation"
import Image from "next/image"

export default function ListLoveCars() {

    const { addLovedCar, removeLovedCar, lovedItems } = useLovedCars()

    return (
        <>
            {
                lovedItems.length === 0
                    ? (

                        <div className="flex justify-center items-center text-4xl mt-10 font-bold text-red-700">No hay coches favoritos</div>
                    )
                    : (
                        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                            {
                                lovedItems.map((car: Car) => (
                                    <div className="p-1 rounded-lg shadow-md hover:shadow-lg" key={car.id}>
                                        <Image
                                            src={car.photo}
                                            width={400}
                                            height={400}
                                            alt={car.name}
                                            className="rounded-lg"
                                        />
                                        <div className="p-3">
                                            <div className="flex flex-col mb-3 gap-x-4">
                                                <p className="text-xl min-h-16 lg:min-h-fit">
                                                    {car.name}
                                                </p>
                                                <p>{car.priceDay}$ </p>
                                            </div>
                                            <p className="flex items-center">
                                                <Gem className="h-4 w-4 mr-2" strokeWidth={1} />
                                                {car.type}
                                            </p>
                                            <p className="flex items-center">
                                                <Wrench className="h-4 w-4 mr-2" strokeWidth={1} />
                                                {car.transmission}
                                            </p>
                                            <p className="flex items-center">
                                                <Users className="h-4 w-4 mr-2" strokeWidth={1} />
                                                {car.people}
                                            </p>
                                            <p className="flex items-center">
                                                <Fuel className="h-4 w-4 mr-2" strokeWidth={1} />
                                                {car.engine}
                                            </p>
                                            <p className="flex items-center">
                                                <Gauge className="h-4 w-4 mr-2" strokeWidth={1} />
                                                {car.cv} CV
                                            </p>

                                            <div className="flex items-center justify-center gap-x-3">
                                                <ModalAddReservation
                                                    car={car}
                                                />
                                                <Heart className="cursor-pointer mt-2 fill-black"
                                                    onClick={
                                                        () => removeLovedCar(car)
                                                    } />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
        </>

    )
}

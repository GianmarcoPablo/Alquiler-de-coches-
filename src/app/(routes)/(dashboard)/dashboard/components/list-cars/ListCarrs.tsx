"use client"

import ModalAddReservation from "@/components/shared/ModalAddReservation"
import { Car } from "@prisma/client"
import { Fuel, Gem, Heart, Users, Wrench } from "lucide-react"
import Image from "next/image"

interface Props {
    cars: Car[]
}

export default function ListCars(props: Props) {

    const { cars } = props


    if (cars.length === 0) return <div className="flex justify-center items-center text-4xl mt-10 font-bold text-red-700">No hay coches disponibles</div>

    return (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {
                cars.map((car) => (
                    <div key={car.id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
                        <Image
                            src={car.photo}
                            alt={car.name}
                            width={400}
                            height={400}
                            className="rounded"
                        />

                        <div className="p-3">
                            <div className="flex flex-col mb-3 gap-x-4">
                                <p className="text-xl min-h-16 lg:min-h-fit">{car.name}</p>
                                <p>{car.priceDay}$ al dia</p>
                            </div>
                            <p className="flex items-center">
                                <Gem className="h-4 w-4 mr-2" strokeWidth={1}></Gem>
                                {car.type}
                            </p>
                            <p className="flex items-center">
                                <Wrench className="h-4 w-4 mr-2" strokeWidth={1}></Wrench>
                                {car.transmission}
                            </p>
                            <p className="flex items-center">
                                <Users className="h-4 w-4 mr-2" strokeWidth={1}></Users>
                                {car.people}
                            </p>
                            <p className="flex items-center">
                                <Fuel className="h-4 w-4 mr-2" strokeWidth={1}></Fuel>
                                {car.engine}
                            </p>

                            <div className="flex items-center justify-center gap-x-3">
                                <ModalAddReservation
                                    car={car}
                                />
                                <Heart
                                    className="mt-2 cursor-pointer"
                                    onClick={() => console.log("Like")}
                                />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

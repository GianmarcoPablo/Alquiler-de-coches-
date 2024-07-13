
import { Button } from "@/components/ui/button"
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react"
import Image from "next/image"
import { useLovedCars } from "@/hooks/useLovedCars"
import { useAuth } from "@clerk/nextjs"
import { Car } from "@prisma/client"
import Link from "next/link"
import ModalAddReservation from "@/components/shared/ModalAddReservation"
import Skeleton from "@/components/shared/Skeleton"


interface ListCarsProps {
    cars: Car[] | undefined
}

export default function ListCars(props: ListCarsProps) {

    const { cars } = props
    const { userId } = useAuth()
    const { addLovedCar, lovedItems, removeLovedCar } = useLovedCars()


    if (!cars) return <Skeleton />

    return (
        <>
            {cars.length === 0 && (
                <p>No se and encontrado vehiculos con estos filtros</p>
            )}

            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {
                    cars.map(car => {

                        const likedCar = lovedItems.some(item => (item.id === car.id))

                        return (
                            <div key={car.id} className="p-1 rounde-lg shadow-md hover:shadow-lg">
                                <Image
                                    src={car.photo}
                                    alt={car.name}
                                    width={400}
                                    height={400}
                                    className="rounded-lg"
                                />
                                <div className="p-3">
                                    <div className="flex flex-col mb-1 gap-x-4">
                                        <p className="text-xl min-h-16 lg:min-h-fit">{car.name}</p>
                                        <p>{car.priceDay}</p>
                                    </div>
                                    <p className="flex items-center">
                                        <Gem className="w-4 h-4 mr-2" strokeWidth={1} />
                                        <p>{car.type}</p>
                                    </p>
                                    <p className="flex items-center">
                                        <Wrench className="w-4 h-4 mr-2" strokeWidth={1} />
                                        <p>{car.transmission}</p>
                                    </p>
                                    <p className="flex items-center">
                                        <Users className="w-4 h-4 mr-2" strokeWidth={1} />
                                        <p>{car.people}</p>
                                    </p>
                                    <p className="flex items-center">
                                        <Fuel className="w-4 h-4 mr-2" strokeWidth={1} />
                                        <p>{car.engine}</p>
                                    </p>
                                    <p className="flex items-center">
                                        <Gauge className="w-4 h-4 mr-2" strokeWidth={1} />
                                        <p>{car.cv} CV</p>
                                    </p>

                                    {
                                        userId ? (
                                            <div className="flex justify-center items-center gap-x-3">
                                                <ModalAddReservation car={car} />
                                                <Heart
                                                    className={`mt-2 cursor-pointer ${likedCar && "fill-black"}`}
                                                    onClick={() => likedCar ? removeLovedCar(car) : addLovedCar(car)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full mt-2 text-center">
                                                <Link href={"/sign-in"}>
                                                    <Button variant={"outline"}>Inicia Session para reservar</Button>
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

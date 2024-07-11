import { ListCarProps } from "@/types/props/ListCarProps";
import CarCard from "./CarCard";


export default function ListCar(props: ListCarProps) {

    const { cars } = props

    return (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 my-4">
            {
                cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))
            }
        </div>
    )
}

"use client"
import { Car } from "@prisma/client"
import { useEffect } from "react"
import { useState } from "react"
import ListCars from "./ListCars"
import FiltersCars from "./FiltersCars"
interface FiltersAndListCarsProps {
    cars: Car[]
}

export default function FiltersAndListCars(props: FiltersAndListCarsProps) {

    const { cars } = props
    const [isClient, setIsClient] = useState(false)
    const [filtersCars, setFiltersCars] = useState<Car[]>()
    const [filters, setFilters] = useState({
        type: "",
        transmission: "",
        engine: "",
        people: "",
    })

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        let filtered = cars

        if (filters.type) {
            filtered = filtered.filter(car => car.type.toLowerCase().includes(filters.type.toLowerCase()))
        }

        if (filters.transmission) {
            filtered = filtered.filter(car => car.transmission.toLowerCase().includes(filters.transmission.toLowerCase()))
        }

        if (filters.engine) {
            filtered = filtered.filter(car => car.engine.toLowerCase().includes(filters.engine.toLowerCase()))
        }

        if (filters.people) {
            filtered = filtered.filter(car => car.people.toLowerCase().includes(filters.people.toLowerCase()))
        }

        console.log({ filtered })

        setFiltersCars(filtered)

    }, [filters, cars])


    const handleFiltersChange = (filterName: string, filterValue: string) => {
        setFilters(prev => ({ ...prev, [filterName]: filterValue }))
    }

    const clearFilters = () => {
        setFilters({
            type: "",
            transmission: "",
            engine: "",
            people: "",
        })
    }

    return (
        <div>
            <FiltersCars
                setFilters={handleFiltersChange}
                clearFilters={clearFilters}
                filters={filters}
            />
            {
                isClient && (
                    <ListCars cars={filtersCars} />
                )
            }
        </div>
    )
}

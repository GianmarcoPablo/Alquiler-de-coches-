import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { toast } from "@/components/ui/use-toast"
import { Car } from "@prisma/client"

interface UseLovedCarsType {
    lovedItems: Car[],
    addLovedCar: (car: Car) => void,
    removeLovedCar: (car: Car) => void
}

export const useLovedCars = create<UseLovedCarsType>()(
    persist<UseLovedCarsType>(
        (set) => ({
            lovedItems: [],
            addLovedCar: (car) => {
                set((state) => ({
                    lovedItems: [...state.lovedItems, car]
                }))
                toast({
                    title: "Added",
                    description: "Car added to your list",
                })
            },
            removeLovedCar: (car) => {
                set((state) => ({
                    lovedItems: state.lovedItems.filter((c) => c.id !== car.id)
                }))
                toast({
                    title: "Removed",
                    description: "Car removed from your list",
                })
            }
        }),
        {
            name: "loved-cars",
            storage: createJSONStorage(() => localStorage)
        }
    )
)
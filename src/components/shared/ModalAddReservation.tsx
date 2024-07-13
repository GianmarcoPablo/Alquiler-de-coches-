import { Car } from "@prisma/client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import CalendarSelector from "./CalendarSelector"
import { useState } from "react"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import axios from "axios"
import { toast } from "../ui/use-toast"

interface Props {
    car: Car
}
export default function ModalAddReservation(props: Props) {

    const { car } = props
    const [dateSelected, setDateSelected] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: new Date(), to: addDays(new Date(), 5)
    })
    const onReserveCar = async (car: Car, dataSelected: DateRange) => {
        const response = await axios.post("/api/checkout", {
            carId: car.id,
            priceDay: car.priceDay,
            startDate: dataSelected.from,
            endDate: dataSelected.to,
            carName: car.name
        })

        window.location.href = response.data.url
        toast({
            title: "Reservado ✔️",
            description: "Se ha reservado el coche correctamente",
        })
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outline"} className="w-full mt-3">Reservar coche</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Selecciona la fecha de alquiler?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <CalendarSelector
                            setDateSelected={setDateSelected}
                            carPriceDay={car.priceDay}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onReserveCar(car, dateSelected)}
                    >Reservar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

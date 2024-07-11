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

interface Props {
    car: Car
}
export default function ModalAddReservation(props: Props) {

    const { car } = props
    const [dateSelected, setDateSelected] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: new Date(), to: addDays(new Date(), 5)
    })
    const onReserveCar = (car: Car, dataSelected: DateRange) => {
        console.log("Reserver car")
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outline"} className="w-full mt-3">Reservar coche</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Selecciona las fechas en las que quieras alquilar este coche?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <CalendarSelector
                            setDateSelected={setDateSelected}
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

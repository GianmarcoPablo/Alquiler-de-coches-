
"use client"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
export type CalendarSelectorProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
    setDateSelected: React.Dispatch<React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>>
}

export default function CalendarSelector(props: CalendarSelectorProps) {

    const { setDateSelected, className } = props

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 5),
    })

    useEffect(() => {
        setDateSelected({
            from: date?.from,
            to: date?.to
        })
    }, [date])

    const calculateDaysBetween = (from: Date, to: Date): number => {
        const oneDay = 24 * 60 * 60 * 1000
        const diffInTime = to.getTime() - from.getTime()
        return Math.round(diffInTime / oneDay)
    }

    const daysBetween = date?.from && date?.to ? calculateDaysBetween(date.from, date.to) : 0

    return (
        <div className={cn("grid gap-2", className)}>
            {date?.from && date.to && (
                <>
                    <p className="mt-4 text-lg text-black">Dias totales {daysBetween}</p>
                    <p>Precio total:  {daysBetween * 30}$ (imp. incluidos)  </p>
                </>
            )}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="calendar"
                        variant={"outline"}
                        className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from
                            ?
                            (
                                date.to
                                    ?
                                    (
                                        <>
                                            {format(date.from, "LLL dd, y")} - {""}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    )
                                    :
                                    (
                                        format(date.from, "LLL dd, y")
                                    )
                            )
                            :
                            (
                                <span>Selecciona una fecha</span>
                            )}
                    </Button>
                </PopoverTrigger>
            </Popover>
        </div>
    )
}

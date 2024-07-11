import { Car } from '@prisma/client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import FormEditCar from './FormEditCar'
interface Props {
    carData: Car
}

export default function ButtonEditCar(props: Props) {
    const { carData } = props
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    Edit
                    <Pencil className="w-4 h-4 ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit car</DialogTitle>
                    <DialogDescription>
                        <FormEditCar
                            carData={carData}
                            setOpen={setOpen}
                        />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

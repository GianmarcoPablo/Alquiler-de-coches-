"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import FormAddCar from "./FormAddCar"
export default function ButtonAddCar() {

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">
                    Añadir coche
                    <PlusCircle className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Añadir coche</DialogTitle>
                    <DialogDescription>
                        <FormAddCar />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

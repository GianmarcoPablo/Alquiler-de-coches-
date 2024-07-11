"use client"
import { Car } from '@prisma/client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadButton } from "@/utils/uploadthing"
import { editCarSchema } from '@/app/validations/edit-car.schema'
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { useRouter } from "next/navigation"


interface Props {
    carData: Car
    setOpen: (value: boolean) => void
}

export default function FormEditCar(props: Props) {

    const { carData, setOpen } = props
    const [photoUloaded, setPhotoUploaded] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof editCarSchema>>({
        resolver: zodResolver(editCarSchema),
        defaultValues: {
            name: carData.name,
            cv: carData.cv,
            transmission: carData.transmission,
            people: carData.people,
            photo: carData.photo,
            engine: carData.engine,
            type: carData.type,
            priceDay: carData.priceDay,
            isPublished: carData.isPublished ? carData.isPublished : false
        },
    })

    const onSubmit = async (values: z.infer<typeof editCarSchema>) => {
        setOpen(false)
        try {
            const data = await axios.patch(`/api/car/${carData.id}/form`, values)
            console.log(data)
            toast({
                title: "Se ha editado el coche correctamente ✔️",
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Error al intentar editar el coche ❌",
                variant: "destructive",
            })
        }
    }


    const { isValid } = form.formState

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tesla Model S Plaid" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cv"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Potencia (cv)</FormLabel>
                                <FormControl>
                                    <Input placeholder="150 cv" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Transmisión</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="manual">Manual</SelectItem>
                                        <SelectItem value="automatic">Automático</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="people"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Personas</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona la cantidad de personas" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="7">7</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="engine"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Motor</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona la capacidad del motor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="gasoil">Gasolina</SelectItem>
                                        <SelectItem value="diesel">Diésel</SelectItem>
                                        <SelectItem value="electric">Eléctrico</SelectItem>
                                        <SelectItem value="hybrid">Híbrido</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de coche</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el tipo de coche" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="sedan">Sedan</SelectItem>
                                        <SelectItem value="suv">SUV</SelectItem>
                                        <SelectItem value="coupe">Coupé</SelectItem>
                                        <SelectItem value="family">Familiar</SelectItem>
                                        <SelectItem value="luxe">De lujo</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagen del coche</FormLabel>
                                <FormControl>
                                    {photoUloaded ? (
                                        <>Imagen subida</>
                                    ) : (
                                        <UploadButton
                                            endpoint="photo"
                                            className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                                            {...field}
                                            onClientUploadComplete={(res) => {
                                                console.log("Archivos: ", res);
                                                form.setValue("photo", res[0].url);
                                                setPhotoUploaded(true);
                                            }}
                                            onUploadError={(error: Error) => {
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priceDay"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio por día</FormLabel>
                                <FormControl>
                                    <Input placeholder="150$" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full mt-5" disabled={!isValid}>Editar coche</Button>
            </form>
        </Form>
    )
}

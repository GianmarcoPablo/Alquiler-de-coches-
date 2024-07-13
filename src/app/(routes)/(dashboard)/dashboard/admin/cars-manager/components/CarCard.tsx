"use client"
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Fuel, Gauge, Upload, Trash, Gem, Users, Wrench } from 'lucide-react'
import Image from 'next/image'
import { CarCardProps } from '@/types/props/CarCardProps'
import { useRouter } from 'next/navigation'
import ButtonEditCar from './ButtonEditCar'
import axios from 'axios'
import { useState } from 'react'

export default function CarCard(props: CarCardProps) {

    const { car } = props
    const router = useRouter()

    const deleteCar = async () => {
        try {
            await axios.delete(`/api/car/${car.id}`)
            toast({
                title: "Se ha eliminado el coche correctamente ✔️",
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Error al intentar eliminar el coche ❌",
                variant: "destructive",
            })
        }
    }

    const handlerPublishCar = async (publish: boolean) => {
        try {
            await axios.patch(`/api/car/${car.id}`, { isPublished: publish })
            toast({
                title: publish ? "Se ha publicado el coche correctamente ✔️" : "Se ha despublicado el coche correctamente ✔️",
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Error al intentar publicar el coche ❌",
                variant: "destructive",
            })
        }
    }

    return (
        <div className='relative p-2 bg-white rounded-lg shadow-md hover:shadow-lg'>
            <Image
                src={car.photo}
                alt={car.name}
                width={400}
                height={600}
                className='rounded-lg my-8'
            />
            {
                car.isPublished ? (
                    <p className='absolute top-0  right-0 w-full p-1 text-center text-white bg-green-300 rounded-t-lg'>Publicado</p>
                ) : (
                    <p className='absolute top-0  left-0 right-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg'>No publicado</p>
                )
            }

            <div className='relative p-3'>
                <div className='flex flex-col mb-3 gap-x-4'>
                    <p className='text-xl min-h-16 lg:min-h-fit'>{car.name}</p>
                    <p className=''>{car.priceDay}</p>
                </div>
                <div className='grid grid-cols-2 gap-x-4'>
                    <p className='flex items-center'>
                        <Gem className='w-4 h-4 mr-2' strokeWidth={1} />
                        {car.type}
                    </p>
                    <p className='flex items-center'>
                        <Wrench className='w-4 h-4 mr-2' strokeWidth={1} />
                        {car.transmission}
                    </p>
                    <p className='flex items-center'>
                        <Users className='w-4 h-4 mr-2' strokeWidth={1} />
                        {car.people}
                    </p>
                    <p className='flex items-center'>
                        <Fuel className='w-4 h-4 mr-2' strokeWidth={1} />
                        {car.engine}
                    </p>
                    <p className='flex items-center'>
                        <Gauge className='w-4 h-4 mr-2' strokeWidth={1} />
                        {car.cv}
                    </p>
                </div>
                <div className='flex justify-between mt-3 gap-x-4'>
                    <Button
                        variant={"outline"}
                        onClick={() => deleteCar()}
                    >
                        Eliminar
                        <Trash className='w-4 h-4 ml-2' strokeWidth={1} />
                    </Button>
                    <ButtonEditCar
                        carData={car}
                    />
                </div>

                {
                    car.isPublished ? (
                        <Button variant={"outline"} className='w-full mt-3' onClick={() => handlerPublishCar(false)}>
                            Quitar publicación
                            <Upload className='w-4 h-4 ml-2' strokeWidth={1} />
                        </Button>
                    ) : (
                        <Button
                            className='w-full mt-3'
                            onClick={() => handlerPublishCar(true)}
                        >
                            Publicar coche
                            <Upload className='w-4 h-4 ml-2' strokeWidth={1} />
                        </Button>
                    )
                }
            </div>
        </div>
    )
}

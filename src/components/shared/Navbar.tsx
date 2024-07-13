import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, User } from 'lucide-react'
import { Button } from '../ui/button'
import { UserButton } from '@clerk/nextjs'
import { useLovedCars } from '@/hooks/useLovedCars'
import LovedCarsCount from './LovedCarsCount'

export default function Navbar() {

    const { userId } = auth()


    return (
        <div className='max-w-5xl py-5 mx-auto'>
            <div className='justify-between lg:flex'>
                <Link href={"/"} className='flex items-center justify-center gap-x-2'>
                    <Image
                        src={"/logo.svg"}
                        alt='logo'
                        width={50}
                        height={50}
                    />
                    <span className='text-xl font-bold'>
                        TarmCars
                    </span>
                </Link>

                <div className='flex items-center justify-center gap-x-7'>
                    <Link href={"/cars"}>
                        Todos los coches
                    </Link>
                    <Link href={"/dashboard"}>
                        Dashboard
                    </Link>
                    {
                        userId ? (
                            <>
                                <LovedCarsCount />
                            </>
                        ) : (
                            <Link href={"/sign-in"} className='flex gap-x-3' >
                                <Button>Iniciar Session</Button>
                                <User strokeWidth={1} className='ml-2 w-4 h-4' />
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

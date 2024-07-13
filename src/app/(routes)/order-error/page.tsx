import Navbar from '@/components/shared/Navbar'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div>
            <Navbar />
            <div className='p-6 mx-auto max-w-7xl'>
                <div className='flex flex-col justify-center gap-4 text-center items-center'>
                    <p className='text-2xl'>Ups! Ocurrio un error</p>
                    <Link href={"/"}>
                        <p className='text-2xl'>Volver</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

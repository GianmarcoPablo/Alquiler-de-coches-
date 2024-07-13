"use client"
import { useLovedCars } from "@/hooks/useLovedCars"
import { UserButton } from "@clerk/nextjs"
import { Heart } from "lucide-react"
import Link from "next/link"


export default function LovedCarsCount() {
    const { lovedItems } = useLovedCars()

    return (
        <>
            <Link href={"/loved-cars"}>
                <Heart strokeWidth={1} className={`cursor-pointer ${lovedItems.length > 0 && "fill-black"}`} />
            </Link>
            <UserButton />
        </>
    )
}

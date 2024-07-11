import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req: Request, { params }: { params: { carId: string } }) {
    try {

        const { userId } = auth()
        const { carId } = params

        const { isPublished } = await req.json()

        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        const car = await db.car.update({
            where: {
                id: carId,
                userId
            },
            data: {
                isPublished: isPublished
            }
        })

        return NextResponse.json(car)
    } catch (error) {
        console.log("[CAR - PATCH]", error)
        return new NextResponse("Internal Errror", { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: { params: { carId: string } }) {
    try {
        const { userId } = auth()
        const { carId } = params
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        const car = await db.car.delete({
            where: {
                id: carId,
                userId
            }
        })
        return NextResponse.json(car)
    } catch (error) {
        console.log("[CAR - DELETE]", error)
        return new NextResponse("Internal Errror", { status: 500 })
    }
}
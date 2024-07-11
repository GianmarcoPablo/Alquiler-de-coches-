import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";


export async function PATCH(req: Request, { params }: { params: { carId: string } }) {
    try {
        const { userId } = auth()
        const { carId } = params
        const values = await req.json()

        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        const car = await db.car.update({
            where: {
                id: carId,
                userId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(car)

    } catch (error) {
        console.log("[CARD FORM EDIT", error)
        return new NextResponse("Internal Errror", { status: 500 })
    }
}
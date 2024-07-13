import { auth } from "@clerk/nextjs/server";
import ButtonAddCar from "./components/ButtonAddCar";
import ListCar from "./components/ListCar";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdministrator } from "@/lib/isAdministrator";

export default async function page() {

    const { userId } = auth()

    if (!userId || !isAdministrator(userId)) redirect("/")


    const cars = await db.car.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })


    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Administra los coches</h2>
                <ButtonAddCar />
            </div>
            <ListCar cars={cars} />
        </div>
    )
}

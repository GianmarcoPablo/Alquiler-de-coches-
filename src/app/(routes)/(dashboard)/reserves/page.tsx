import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import ListReservesTable from "./components/ListReservesTable"

export default async function page() {

    const { userId } = auth()

    if (!userId) return redirect("/")

    const orders = await db.order.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div>
            <h1 className="mb-4 text-3xl">Tus reservas</h1>

            {
                orders.length === 0
                    ? (
                        <div className="flex flex-col justify-center gap-4 items-center">
                            <h2>No tienes ninguna reserva</h2>
                            <p>Haz tus pedidos a travez de la pagina de coches</p>
                            <Link href={"/cars"}>
                                <Button>Ver coches</Button>
                            </Link>
                        </div>
                    )
                    : <ListReservesTable orders={orders} />
            }
        </div>
    )
}

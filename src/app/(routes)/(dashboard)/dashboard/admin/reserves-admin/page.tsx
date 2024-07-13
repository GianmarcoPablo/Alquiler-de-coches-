import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import TableReservesAdmin from "./components/TableReservesAdmin"
import { isAdministrator } from "@/lib/isAdministrator"


export default async function page() {

    const { userId } = auth()
    const user = await currentUser()
    if (!userId || !user || !isAdministrator(userId)) return redirect("/")

    const order = await db.order.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div>
            <h1 className="text-3xl mb-4">Todas las reservas</h1>
            <TableReservesAdmin orders={order} />
        </div>
    )
}

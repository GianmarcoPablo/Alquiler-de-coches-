import { Order } from "@prisma/client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Formatters } from "@/lib/pricer-formatter"


interface TableReservesAdminProps {
    orders: Order[]
}

export default function TableReservesAdmin(props: TableReservesAdminProps) {

    const { orders } = props
    const totalAmmount = orders.reduce((acc, order) => acc + Number(order.totalAmount), 0)

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Fecha de la orden</TableHead>
                    <TableHead>Cliente #</TableHead>
                    <TableHead>Coche</TableHead>
                    <TableHead>Fecha de inicio</TableHead>
                    <TableHead>Fecha de fin</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell className='font-medium'>{new Date(order.createdAt).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}</TableCell>
                            <TableCell className="max-w-[100px] truncate">{order.userId}</TableCell>
                            <TableCell>{order.carName}</TableCell>
                            <TableCell>{new Date(order.orderDate).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</TableCell>
                            <TableCell>{new Date(order.orderEndDate).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</TableCell>
                            <TableCell className='text-right'>{Formatters.formatPrice(Number(order.totalAmount))}</TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Total</TableCell>
                    <TableCell className='text-right'>{Formatters.formatPrice(totalAmmount)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table >

    )
}

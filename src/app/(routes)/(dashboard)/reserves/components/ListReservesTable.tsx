import React from 'react'
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
import { Order } from '@prisma/client'
import { Formatters } from '@/lib/pricer-formatter'


interface ListReservesTableProps {
    orders: Order[]
}

export default function ListReservesTable(props: ListReservesTableProps) {
    const { orders } = props

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Coche</TableHead>
                    <TableHead>Alquilado En</TableHead>
                    <TableHead>Fin Alquiler</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell className='font-medium'>{order.carName}</TableCell>
                            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(order.orderEndDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <div className='p-2 bg-green-600 text-white rounde-lg w-fit flex justify-center items-center mx-auto'>
                                    {order.status}
                                </div>
                            </TableCell>
                            <TableCell className='text-right'>{Formatters.formatPrice(Number(order.totalAmount))}</TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-right"></TableHead>
                    <TableHead className="text-right">{Formatters.formatPrice(Number(orders.reduce((acc, order) => acc + Number(order.totalAmount), 0)))}</TableHead>
                </TableRow>
            </TableFooter>
        </Table>

    )
}

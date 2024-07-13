import Navbar from "@/components/shared/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function page() {
    return (
        <div>
            <Navbar />

            <div className="p-6 mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <h1>Muchas Gracias por confiar en nosotros</h1>
                    <p>En seguida recibiras un email de confirmacion</p>
                    <p>Puedes visualizar todas tus reservas dentro de tu area de cliente</p>
                    <Link
                        href={"/"}
                    >
                        <Button>
                            Ir a ver mas coches
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

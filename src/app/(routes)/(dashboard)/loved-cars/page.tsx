import { auth } from "@clerk/nextjs/server";
import ListLoveCars from "./components/ListLoveCars";
import { redirect } from "next/navigation";



export default function page() {

    const { userId } = auth()

    if (!userId) return redirect("/")

    return (
        <div>
            <h1 className="text-2xl">Coches que te gustan</h1>
            <ListLoveCars />
        </div>
    )
}

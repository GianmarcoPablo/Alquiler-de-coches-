"use client"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@clerk/nextjs"
import { dataGeneralSidebar } from "./Sidebar-Routes-data"
import SidebarItem from "./SidebarItem"
export default function SidebarRoutes() {

    const { userId } = useAuth()

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className="mb-2 text-slate-700">General</p>
                    {
                        dataGeneralSidebar.map((item, index) => (
                            <SidebarItem
                                key={index}
                                item={item}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

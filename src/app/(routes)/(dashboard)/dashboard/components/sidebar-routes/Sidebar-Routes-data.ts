import { Calendar, Car, Heart, Users } from "lucide-react"

export const dataGeneralSidebar  = [
    {   
        icon: Car,
        label: "Cars",
        href: "/dashboard"
    },
    {   
        icon: Calendar,
        label: "Cars Reserves",
        href: "/reserves"
    },
    {   
        icon: Heart,
        label: "Loved Cars",
        href: "/loved-cars"
    },

]

export const dataAdminSdiebar = [
    {
        icon: Users,
        label: "Users",
        href: "/dashboard/admin/cars-manager"
    }
]
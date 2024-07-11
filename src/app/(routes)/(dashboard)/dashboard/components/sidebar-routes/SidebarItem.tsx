import { cn } from '@/lib/utils'
import { Icon, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
    item: any
}

export default function SidebarItem({ item }: Props) {

    const { icon: Icon } = item

    const pathName = usePathname()
    const activePath = pathName === item.href
    return (
        <div>
            <Link className={cn(`flex gap-x-2 mt-2 text-slate-700 text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer`, activePath && `bg-slate-300/20`)} href={item.href}>
                <Icon className="w-4 h-4" strokeWidth={1} />
                {item.label}
            </Link>
        </div>
    )
}

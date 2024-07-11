import React from 'react'
import LogoDashboard from '../logo-dashboard/LogoDashboard'
import SidebarRoutes from '../sidebar-routes/SidebarRoutes'

export default function Sidebar() {
    return (
        <div className='h-screen'>
            <div className='flex flex-col h-full border-r'>
                <LogoDashboard />
                <SidebarRoutes />
            </div>
        </div>
    )
}

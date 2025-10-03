'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Users,
  Car,
  Settings,
  DollarSign,
  Menu,
  ChevronLeft,
  Home
} from 'lucide-react'

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'Aluno',
    href: '/aluno',
    icon: Users,
  },
  {
    title: 'Frota',
    href: '/frota',
    icon: Car,
  },
  {
    title: 'Administrativo',
    href: '/administrativo',
    icon: Settings,
  },
  {
    title: 'Financeiro',
    href: '/financeiro',
    icon: DollarSign,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarExpanded, toggleSidebar, currentUser } = useAppStore()

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-blue-900 text-white transition-all duration-300 ease-in-out',
        sidebarExpanded ? 'w-64' : 'w-16'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        <div className={cn('flex items-center space-x-3', !sidebarExpanded && 'justify-center')}>
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="AutoGestor Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          {sidebarExpanded && (
            <h1 className="text-xl font-bold">AutoGestor</h1>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-white hover:bg-blue-800"
        >
          {sidebarExpanded ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                  'hover:bg-blue-800',
                  isActive && 'bg-blue-700',
                  !sidebarExpanded && 'justify-center'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarExpanded && (
                  <span className="font-medium">{item.title}</span>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-blue-800">
        <div className={cn('flex items-center space-x-3', !sidebarExpanded && 'justify-center')}>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-600 text-white">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {sidebarExpanded && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-blue-300 truncate">{currentUser.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
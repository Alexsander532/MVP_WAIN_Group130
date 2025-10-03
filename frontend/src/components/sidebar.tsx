'use client'


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
  ChevronLeft,
  Home,
  GraduationCap,
  FileText,
  Briefcase
} from 'lucide-react'

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'Alunos',
    href: '/aluno',
    icon: Users,
  },
  {
    title: 'Comercial',
    href: '/comercial',
    icon: Briefcase,
  },
  {
    title: 'Frota',
    href: '/frota',
    icon: Car,
  },
  {
    title: 'Instrutor',
    href: '/instrutor',
    icon: GraduationCap,
  },
  {
    title: 'Financeiro',
    href: '/financeiro',
    icon: DollarSign,
  },
  {
    title: 'Relatórios',
    href: '/relatorios',
    icon: FileText,
  },
  {
    title: 'Administrativo',
    href: '/administrativo',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarExpanded, toggleSidebar, setSidebarExpanded, currentUser } = useAppStore()

  const handleMouseEnter = () => {
    setSidebarExpanded(true)
  }

  const handleMouseLeave = () => {
    setSidebarExpanded(false)
  }

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out border-r border-sidebar-border',
        sidebarExpanded ? 'w-64' : 'w-16'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className={cn(
        'flex items-center p-4',
        sidebarExpanded ? 'justify-between' : 'justify-center'
      )}>
        <div className={cn('flex items-center space-x-3', !sidebarExpanded && 'justify-center')}>
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-sm">
            <Image
              src="/logo.png"
              alt="AutoGestor Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          {sidebarExpanded && (
            <h1 className="text-xl font-bold text-sidebar-foreground">AutoGestor</h1>
          )}
        </div>
        {sidebarExpanded && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200',
                  'hover:bg-sidebar-accent hover:scale-105',
                  isActive && 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg',
                  !sidebarExpanded && 'justify-center',
                  !isActive && 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarExpanded && (
                  <span className="font-medium text-sm">{item.title}</span>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <div className={cn('flex items-center space-x-3', !sidebarExpanded && 'justify-center')}>
          <Avatar className="w-10 h-10 ring-2 ring-sidebar-accent">
            <AvatarFallback className="bg-white text-sidebar font-bold text-lg">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {sidebarExpanded && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-sidebar-foreground">{currentUser.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{currentUser.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
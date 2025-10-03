'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { getGreetingWithName } from '@/lib/greeting'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Header() {
  const [greeting, setGreeting] = useState('')
  const { currentUser } = useAppStore()

  useEffect(() => {
    // Para o header, usar "Couto (Vulgo Noivo)" em vez do nome completo
    const displayName = currentUser.name === 'Matheus Couto' ? 'Couto (Vulgo Noivo)' : currentUser.name
    setGreeting(getGreetingWithName(displayName))
  }, [currentUser.name])

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Greeting prominente */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{greeting}</h1>
          <p className="text-sm text-muted-foreground">
            Bem-vindo ao painel de controle da AutoEscola
          </p>
        </div>

        {/* Right side - Search, Notifications, User */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-sm w-48 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Avatar */}
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-600 text-white">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
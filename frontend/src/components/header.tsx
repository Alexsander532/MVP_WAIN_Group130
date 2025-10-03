'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/lib/store'
import { getGreetingWithName } from '@/lib/greeting'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'

export function Header() {
  const [greeting, setGreeting] = useState('')
  const { currentUser } = useAppStore()

  useEffect(() => {
    setGreeting(getGreetingWithName(currentUser.name))
  }, [currentUser.name])

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Greeting prominente */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}</h1>
          <p className="text-gray-600">Bem-vindo ao sistema de gestão da autoescola</p>
        </div>

        {/* Right side - Search, Notifications, User */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

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
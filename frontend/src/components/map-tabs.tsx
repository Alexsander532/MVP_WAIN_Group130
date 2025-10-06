'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export type MapType = 'fire-outbreak' | 'air-pollution' | 'flood' | 'ocean-current' | 'air-current'

interface MapTab {
  id: MapType
  label: string
  color: string
}

const mapTabs: MapTab[] = [
  {
    id: 'fire-outbreak',
    label: 'Fire outbreak',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 'air-pollution',
    label: 'Air pollution',
    color: 'bg-gray-400 hover:bg-gray-500'
  },
  {
    id: 'flood',
    label: 'Flood',
    color: 'bg-gray-400 hover:bg-gray-500'
  },
  {
    id: 'ocean-current',
    label: 'Ocean current',
    color: 'bg-gray-400 hover:bg-gray-500'
  },
  {
    id: 'air-current',
    label: 'Air current',
    color: 'bg-gray-400 hover:bg-gray-500'
  }
]

interface MapTabsProps {
  activeTab: MapType
  onTabChange: (tab: MapType) => void
}

export function MapTabs({ activeTab, onTabChange }: MapTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {mapTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-200",
            activeTab === tab.id 
              ? "bg-blue-600 hover:bg-blue-700 shadow-md" 
              : "bg-gray-400 hover:bg-gray-500"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
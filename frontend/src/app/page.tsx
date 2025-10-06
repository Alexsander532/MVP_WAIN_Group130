'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/app-layout'
import { MapTabs, MapType } from '@/components/map-tabs'
import { EnvironmentalMap } from '@/components/environmental-map'
import { TemperatureChart } from '@/components/temperature-chart'
import { HumidityChart } from '@/components/humidity-chart'
import { WindChart } from '@/components/wind-chart'
import { AtmosphericChart } from '@/components/atmospheric-chart'

export default function Dashboard() {
  const [activeMapType, setActiveMapType] = useState<MapType>('fire-outbreak')

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Map Navigation Tabs */}
        <div className="space-y-4">
          <MapTabs 
            activeTab={activeMapType} 
            onTabChange={setActiveMapType} 
          />
          <EnvironmentalMap activeMapType={activeMapType} />
        </div>

        {/* Meteorological Data Section */}
        <div className="space-y-6">
          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              📊 NASA Weather Data
            </h2>
            <p className="text-muted-foreground mb-6">
              Real-time analysis of atmospheric and climate data collected by NASA satellites and weather stations
            </p>
          </div>

          {/* Temperature and Humidity Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TemperatureChart />
            <HumidityChart />
          </div>

          {/* Wind Chart */}
          <WindChart />

          {/* Atmospheric Data (Pressure and Air Quality) */}
          <AtmosphericChart />
        </div>
      </div>
    </AppLayout>
  )
}

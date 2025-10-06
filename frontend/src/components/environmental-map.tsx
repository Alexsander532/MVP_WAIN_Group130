'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InteractiveWorldMap } from './interactive-world-map'
import { MapType } from './map-tabs'

interface EnvironmentalMapProps {
  activeMapType: MapType
}

const mapConfigs = {
  'fire-outbreak': {
    title: 'Fire Outbreak Map',
    description: 'Real-time fire outbreak monitoring and risk assessment worldwide'
  },
  'air-pollution': {
    title: 'Air Pollution Map',
    description: 'Global air quality index and pollution levels monitoring'
  },
  'flood': {
    title: 'Flood Risk Map',
    description: 'Worldwide flood monitoring and water level tracking'
  },
  'ocean-current': {
    title: 'Ocean Current Map',
    description: 'Global ocean current patterns and marine conditions'
  },
  'air-current': {
    title: 'Air Current Map',
    description: 'Worldwide wind patterns and atmospheric conditions'
  }
}

export function EnvironmentalMap({ activeMapType }: EnvironmentalMapProps) {
  const config = mapConfigs[activeMapType]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          {config.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {config.description}
        </p>
      </CardHeader>
      <CardContent>
        <InteractiveWorldMap 
          activeMapType={activeMapType} 
          height="500px"
        />
      </CardContent>
    </Card>
  )
}
'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapType } from './map-tabs'

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface InteractiveWorldMapProps {
  activeMapType: MapType
  height?: string
}

// Dados simulados para diferentes tipos de mapas
const mapData = {
  'fire-outbreak': [
    { lat: -23.5505, lng: -46.6333, intensity: 'high', name: 'São Paulo Fire Risk' },
    { lat: 37.7749, lng: -122.4194, intensity: 'medium', name: 'San Francisco Fire Risk' },
    { lat: -33.8688, lng: 151.2093, intensity: 'low', name: 'Sydney Fire Risk' },
    { lat: 40.7128, lng: -74.0060, intensity: 'medium', name: 'New York Fire Risk' },
    { lat: 51.5074, lng: -0.1278, intensity: 'low', name: 'London Fire Risk' }
  ],
  'air-pollution': [
    { lat: 39.9042, lng: 116.4074, intensity: 'high', name: 'Beijing Air Quality' },
    { lat: 28.7041, lng: 77.1025, intensity: 'high', name: 'Delhi Air Quality' },
    { lat: 34.0522, lng: -118.2437, intensity: 'medium', name: 'Los Angeles Air Quality' },
    { lat: 55.7558, lng: 37.6176, intensity: 'medium', name: 'Moscow Air Quality' },
    { lat: 35.6762, lng: 139.6503, intensity: 'low', name: 'Tokyo Air Quality' }
  ],
  'flood': [
    { lat: 23.8103, lng: 90.4125, intensity: 'high', name: 'Dhaka Flood Risk' },
    { lat: 6.5244, lng: 3.3792, intensity: 'medium', name: 'Lagos Flood Risk' },
    { lat: 25.2048, lng: 55.2708, intensity: 'low', name: 'Dubai Flood Risk' },
    { lat: 52.3676, lng: 4.9041, intensity: 'medium', name: 'Amsterdam Flood Risk' },
    { lat: 29.7604, lng: -95.3698, intensity: 'high', name: 'Houston Flood Risk' }
  ],
  'ocean-current': [
    { lat: 0, lng: -30, intensity: 'high', name: 'Atlantic Current' },
    { lat: -10, lng: 50, intensity: 'medium', name: 'Indian Ocean Current' },
    { lat: 20, lng: -150, intensity: 'high', name: 'Pacific Current' },
    { lat: -40, lng: 140, intensity: 'medium', name: 'Southern Ocean Current' }
  ],
  'air-current': [
    { lat: 30, lng: 0, intensity: 'high', name: 'Jet Stream North' },
    { lat: -30, lng: 0, intensity: 'high', name: 'Jet Stream South' },
    { lat: 0, lng: 180, intensity: 'medium', name: 'Trade Winds Pacific' },
    { lat: 0, lng: 0, intensity: 'medium', name: 'Trade Winds Atlantic' }
  ]
}

const getMarkerColor = (intensity: string, mapType: MapType) => {
  const colors = {
    'fire-outbreak': { high: '#dc2626', medium: '#f97316', low: '#fbbf24' },
    'air-pollution': { high: '#374151', medium: '#6b7280', low: '#9ca3af' },
    'flood': { high: '#1d4ed8', medium: '#3b82f6', low: '#60a5fa' },
    'ocean-current': { high: '#0ea5e9', medium: '#38bdf8', low: '#7dd3fc' },
    'air-current': { high: '#8b5cf6', medium: '#a78bfa', low: '#c4b5fd' }
  }
  return colors[mapType][intensity as keyof typeof colors[MapType]] || '#6b7280'
}

export function InteractiveWorldMap({ activeMapType, height = '500px' }: InteractiveWorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    // Inicializar o mapa apenas uma vez
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [20, 0], // Centro do mundo
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true
      })

      // Adicionar camada de tiles (mapa base)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        minZoom: 1
      }).addTo(mapInstanceRef.current)
    }

    // Limpar marcadores existentes
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker)
    })
    markersRef.current = []

    // Adicionar novos marcadores baseados no tipo de mapa ativo
    const currentData = mapData[activeMapType] || []
    
    currentData.forEach(point => {
      if (!mapInstanceRef.current) return

      const color = getMarkerColor(point.intensity, activeMapType)
      
      // Criar ícone customizado
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })

      const marker = L.marker([point.lat, point.lng], { icon: customIcon })
        .bindPopup(`
          <div style="font-family: system-ui, sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${point.name}</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">
              <strong>Intensity:</strong> ${point.intensity.charAt(0).toUpperCase() + point.intensity.slice(1)}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">
              <strong>Coordinates:</strong> ${point.lat.toFixed(4)}, ${point.lng.toFixed(4)}
            </p>
          </div>
        `)
        .addTo(mapInstanceRef.current)

      markersRef.current.push(marker)
    })

    return () => {
      // Cleanup será feito quando o componente for desmontado
    }
  }, [activeMapType])

  // Cleanup quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-gray-200 shadow-lg">
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="z-0"
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10 max-w-xs">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          {activeMapType.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')} Legend
        </h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-white shadow-sm" 
              style={{ backgroundColor: getMarkerColor('high', activeMapType) }}
            ></div>
            <span>High Intensity</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-white shadow-sm" 
              style={{ backgroundColor: getMarkerColor('medium', activeMapType) }}
            ></div>
            <span>Medium Intensity</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full border border-white shadow-sm" 
              style={{ backgroundColor: getMarkerColor('low', activeMapType) }}
            ></div>
            <span>Low Intensity</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Click markers for details • Zoom and pan to explore
          </p>
        </div>
      </div>

      {/* Controls Info */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-10">
        <div className="text-xs text-gray-600 space-y-1">
          <div>🖱️ Drag to pan</div>
          <div>🔍 Scroll to zoom</div>
          <div>📍 Click markers for info</div>
        </div>
      </div>
    </div>
  )
}
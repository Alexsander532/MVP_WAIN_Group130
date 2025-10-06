'use client'

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wind, Navigation } from 'lucide-react'

// Simulando dados de vento da NASA para as últimas 24 horas
const generateWindData = () => {
  const data = []
  const now = new Date()
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hour = time.getHours()
    
    // Simulando variação de vento mais realista
    // Ventos mais fortes durante o dia
    let baseSpeed = 5
    if (hour >= 8 && hour <= 20) {
      baseSpeed = 8 + Math.sin((hour - 8) * Math.PI / 12) * 6
    } else {
      baseSpeed = 3 + Math.random() * 4
    }
    
    // Adicionando variação aleatória
    const windSpeed = Math.max(0, baseSpeed + (Math.random() - 0.5) * 4)
    const windDirection = directions[Math.floor(Math.random() * directions.length)]
    const windDirectionDegrees = directions.indexOf(windDirection) * 45
    
    // Rajadas de vento (ocasionalmente mais altas)
    const gust = windSpeed + Math.random() * 8
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      windSpeed: Math.round(windSpeed * 10) / 10,
      gust: Math.round(gust * 10) / 10,
      direction: windDirection,
      directionDegrees: windDirectionDegrees,
    })
  }
  
  return data
}

// Componente para mostrar a rosa dos ventos atual
function WindRose({ direction, speed }: { direction: string; speed: number }) {
  const getWindIntensity = (speed: number) => {
    if (speed < 5) return { color: 'text-green-500', intensity: 'Weak' }
    if (speed < 15) return { color: 'text-yellow-500', intensity: 'Moderate' }
    if (speed < 25) return { color: 'text-orange-500', intensity: 'Strong' }
    return { color: 'text-red-500', intensity: 'Very Strong' }
  }
  
  const windInfo = getWindIntensity(speed)
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-16 h-16 border-2 border-muted rounded-full flex items-center justify-center">
        <Navigation 
          className={`h-6 w-6 ${windInfo.color} transform transition-transform duration-500`}
          style={{ 
            transform: `rotate(${['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].indexOf(direction) * 45}deg)` 
          }}
        />
      </div>
      <div className="text-center">
        <div className={`font-bold ${windInfo.color}`}>{direction}</div>
        <div className="text-xs text-muted-foreground">{windInfo.intensity}</div>
      </div>
    </div>
  )
}

export function WindChart() {
  const data = generateWindData()
  const currentWind = data[data.length - 1] || { windSpeed: 0, direction: 'N', gust: 0 }
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Wind className="h-5 w-5 text-blue-500" />
          Wind Speed
        </CardTitle>
        <div className="flex items-center gap-4">
          <WindRose direction={currentWind.direction} speed={currentWind.windSpeed} />
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-500">{currentWind.windSpeed} km/h</div>
            <div className="text-xs text-muted-foreground">Gusts: {currentWind.gust} km/h</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number, name: string) => [
                  `${value} km/h`,
                  name === 'windSpeed' ? 'Wind Speed' : 
                  name === 'gust' ? 'Gusts' : name
                ]}
              />
              <Legend />
              <Bar 
                dataKey="windSpeed" 
                fill="#3b82f6" 
                name="Wind Speed"
                radius={[2, 2, 0, 0]}
              />
              <Line 
                type="monotone" 
                dataKey="gust" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                name="Gusts"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-green-600">Weak</div>
            <div className="text-xs text-muted-foreground">0-5 km/h</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-yellow-600">Moderate</div>
            <div className="text-xs text-muted-foreground">5-15 km/h</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-orange-600">Strong</div>
            <div className="text-xs text-muted-foreground">15-25 km/h</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-red-600">Very Strong</div>
            <div className="text-xs text-muted-foreground">&gt;25 km/h</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Source:</strong> NASA meteorological stations and satellite data
          </p>
          <p>
            <strong>Measurement:</strong> Average wind speed and gusts with direction
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
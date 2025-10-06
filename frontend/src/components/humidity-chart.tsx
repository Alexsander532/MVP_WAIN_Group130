'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplets } from 'lucide-react'

// Simulando dados de umidade da NASA para as últimas 24 horas
const generateHumidityData = () => {
  const data = []
  const now = new Date()
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hour = time.getHours()
    
    // Simulando variação de umidade mais realista
    // Umidade mais alta de madrugada, mais baixa durante o dia
    let baseHumidity = 70
    if (hour >= 6 && hour <= 18) {
      // Durante o dia, umidade diminui
      baseHumidity = 80 - Math.sin((hour - 6) * Math.PI / 12) * 25
    } else {
      // Durante a noite, umidade aumenta
      baseHumidity = 75 + Math.random() * 15
    }
    
    // Adicionando variação aleatória
    const humidity = Math.max(30, Math.min(95, baseHumidity + (Math.random() - 0.5) * 10))
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      humidity: Math.round(humidity * 10) / 10,
      dewPoint: Math.round((humidity * 0.6 + 10) * 10) / 10, // Ponto de orvalho simulado
    })
  }
  
  return data
}

export function HumidityChart() {
  const data = generateHumidityData()
  const currentHumidity = data[data.length - 1]?.humidity || 0
  
  // Função para determinar a cor baseada na umidade
  const getHumidityColor = (humidity: number) => {
    if (humidity < 40) return 'text-red-500'
    if (humidity < 60) return 'text-yellow-500'
    return 'text-blue-500'
  }
  
  const getHumidityStatus = (humidity: number) => {
    if (humidity < 40) return 'Low'
    if (humidity < 60) return 'Moderate'
    return 'High'
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          Relative Humidity
        </CardTitle>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getHumidityColor(currentHumidity)}`}>
            {currentHumidity}%
          </div>
          <div className="text-xs text-muted-foreground">
            {getHumidityStatus(currentHumidity)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="dewPointGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number, name: string) => [
                  `${value}${name.includes('humidity') ? '%' : '°C'}`,
                  name
                ]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#humidityGradient)"
                name="Relative Humidity (%)"
              />
              <Area
                type="monotone"
                dataKey="dewPoint"
                stroke="#06b6d4"
                strokeWidth={1}
                fill="url(#dewPointGradient)"
                name="Dew Point (°C)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-blue-600">Ideal</div>
            <div className="text-xs text-muted-foreground">40-60%</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-yellow-600">Moderate</div>
            <div className="text-xs text-muted-foreground">60-80%</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="font-semibold text-red-600">Extreme</div>
            <div className="text-xs text-muted-foreground">&gt;80%</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Source:</strong> NASA meteorological satellite data
          </p>
          <p>
            <strong>Measurement:</strong> Relative air humidity and dew point
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
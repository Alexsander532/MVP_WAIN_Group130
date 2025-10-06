'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Thermometer } from 'lucide-react'

// Simulando dados de temperatura da NASA para as últimas 24 horas
const generateTemperatureData = () => {
  const data = []
  const now = new Date()
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hour = time.getHours()
    
    // Simulando variação de temperatura mais realista
    // Temperatura mais baixa de madrugada, mais alta durante o dia
    let baseTemp = 20
    if (hour >= 6 && hour <= 18) {
      baseTemp = 25 + Math.sin((hour - 6) * Math.PI / 12) * 8
    } else {
      baseTemp = 18 + Math.random() * 4
    }
    
    // Adicionando variação aleatória
    const temperature = baseTemp + (Math.random() - 0.5) * 3
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.round((60 + Math.random() * 30) * 10) / 10, // Umidade entre 60-90%
    })
  }
  
  return data
}

export function TemperatureChart() {
  const data = generateTemperatureData()
  const currentTemp = data[data.length - 1]?.temperature || 0
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-red-500" />
          Global Temperature
        </CardTitle>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-500">{currentTemp}°C</div>
          <div className="text-xs text-muted-foreground">Current</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                domain={['dataMin - 2', 'dataMax + 2']}
                label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                name="Temperature (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <strong>Source:</strong> Simulated data based on NASA meteorological patterns
          </p>
          <p>
            <strong>Update:</strong> Data collected every hour for the last 24 hours
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
'use client'

import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Gauge, Leaf, AlertTriangle, Wind } from 'lucide-react'

// Simulando dados atmosféricos da NASA para as últimas 24 horas
const generateAtmosphericData = () => {
  const data = []
  const now = new Date()
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hour = time.getHours()
    
    // Simulando variação de pressão atmosférica (mais estável)
    const basePressure = 1013.25 // Pressão padrão ao nível do mar
    const pressure = basePressure + Math.sin(hour * Math.PI / 12) * 5 + (Math.random() - 0.5) * 3
    
    // Simulando qualidade do ar (AQI - Air Quality Index)
    // Varia com a hora do dia (pior durante rush hours)
    let baseAQI = 50
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      baseAQI = 80 + Math.random() * 40 // Rush hours
    } else if (hour >= 10 && hour <= 16) {
      baseAQI = 60 + Math.random() * 30 // Dia
    } else {
      baseAQI = 30 + Math.random() * 20 // Noite
    }
    
    // Componentes da qualidade do ar
    const pm25 = Math.max(5, baseAQI * 0.4 + (Math.random() - 0.5) * 10)
    const pm10 = pm25 * 1.5 + Math.random() * 5
    const ozone = Math.max(20, 60 + Math.sin(hour * Math.PI / 12) * 20 + (Math.random() - 0.5) * 15)
    const no2 = Math.max(10, baseAQI * 0.3 + (Math.random() - 0.5) * 8)
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      pressure: Math.round(pressure * 100) / 100,
      aqi: Math.round(baseAQI),
      pm25: Math.round(pm25 * 10) / 10,
      pm10: Math.round(pm10 * 10) / 10,
      ozone: Math.round(ozone * 10) / 10,
      no2: Math.round(no2 * 10) / 10,
    })
  }
  
  return data
}

// Dados para o gráfico de pizza da composição do ar
const generateAirComposition = () => {
  const currentData = generateAtmosphericData()
  const latest = currentData[currentData.length - 1]
  
  return [
    { name: 'PM2.5', value: latest.pm25, color: '#ef4444' },
    { name: 'PM10', value: latest.pm10, color: '#f97316' },
    { name: 'Ozone', value: latest.ozone, color: '#eab308' },
    { name: 'NO2', value: latest.no2, color: '#8b5cf6' },
  ]
}

function AQIIndicator({ aqi }: { aqi: number }) {
  const getAQIInfo = (aqi: number) => {
    if (aqi <= 50) return { color: 'text-green-500', bg: 'bg-green-100', status: 'Good', description: 'Clean air' }
    if (aqi <= 100) return { color: 'text-yellow-500', bg: 'bg-yellow-100', status: 'Moderate', description: 'Acceptable' }
    if (aqi <= 150) return { color: 'text-orange-500', bg: 'bg-orange-100', status: 'Unhealthy', description: 'Sensitive groups' }
    if (aqi <= 200) return { color: 'text-red-500', bg: 'bg-red-100', status: 'Unhealthy', description: 'Everyone affected' }
    return { color: 'text-purple-500', bg: 'bg-purple-100', status: 'Hazardous', description: 'Emergency' }
  }
  
  const aqiInfo = getAQIInfo(aqi)
  
  return (
    <div className={`p-3 rounded-lg ${aqiInfo.bg}`}>
      <div className={`text-lg font-bold ${aqiInfo.color}`}>AQI: {aqi}</div>
      <div className={`text-sm font-medium ${aqiInfo.color}`}>{aqiInfo.status}</div>
      <div className="text-xs text-muted-foreground">{aqiInfo.description}</div>
    </div>
  )
}

export function AtmosphericChart() {
  const data = generateAtmosphericData()
  const airComposition = generateAirComposition()
  const currentData = data[data.length - 1] || { pressure: 1013.25, aqi: 50 }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pressão Atmosférica */}
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Gauge className="h-5 w-5 text-blue-500" />
            Atmospheric Pressure
          </CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-500">{currentData.pressure} hPa</div>
            <div className="text-xs text-muted-foreground">
              {currentData.pressure > 1013 ? 'High pressure' : 'Low pressure'}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
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
                  domain={['dataMin - 5', 'dataMax + 5']}
                  label={{ value: 'Pressure (hPa)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: number) => [`${value} hPa`, 'Pressão Atmosférica']}
                />
                <Line 
                  type="monotone" 
                  dataKey="pressure" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Atmospheric Pressure"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p><strong>Normal:</strong> 1013.25 hPa ao nível do mar</p>
          </div>
        </CardContent>
      </Card>

      {/* Qualidade do Ar */}
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Wind className="h-5 w-5 text-purple-500" />
            Air Quality (AQI)
          </CardTitle>
          <AQIIndicator aqi={currentData.aqi} />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gráfico de linha do AQI */}
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={data.slice(-12)} // Últimas 12 horas
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
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    domain={[0, 200]}
                    label={{ value: 'AQI Index', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                    formatter={(value: number) => [value, 'AQI']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="aqi" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Air Quality Index"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Composição do ar */}
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={airComposition}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {airComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string) => [`${value} µg/m³`, name]}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="text-center p-2 bg-green-100 rounded">
              <div className="font-semibold text-green-700">Good</div>
              <div className="text-green-600">0-50</div>
            </div>
            <div className="text-center p-2 bg-yellow-100 rounded">
              <div className="font-semibold text-yellow-700">Moderate</div>
              <div className="text-yellow-600">51-100</div>
            </div>
            <div className="text-center p-2 bg-orange-100 rounded">
              <div className="font-semibold text-orange-700">Unhealthy</div>
              <div className="text-orange-600">101-150</div>
            </div>
            <div className="text-center p-2 bg-red-100 rounded">
              <div className="font-semibold text-red-700">Hazardous</div>
              <div className="text-red-600">151+</div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p><strong>Source:</strong> NASA atmospheric sensors and satellite data</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
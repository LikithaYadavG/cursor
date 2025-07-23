"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockContacts } from "@/lib/mock-data"

const COLORS = [
  "#3B82F6", // blue-500
  "#8B5CF6", // violet-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#06B6D4", // cyan-500
  "#8B5A2B", // brown-500
  "#6B7280", // gray-500
]

export const AnalyticsCharts = () => {
  const [chartType, setChartType] = useState<"pie" | "bar">("pie")
  const [dataType, setDataType] = useState<"country" | "persona">("country")

  const countryData = useMemo(() => {
    const countryCount = mockContacts.reduce((acc, contact) => {
      acc[contact.location_country] = (acc[contact.location_country] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(countryCount).map(([country, count]) => ({
      name: country,
      value: count,
      percentage: ((count / mockContacts.length) * 100).toFixed(1)
    }))
  }, [])

  const personaData = useMemo(() => {
    const personaCount = mockContacts.reduce((acc, contact) => {
      acc[contact.buyer_persona_type] = (acc[contact.buyer_persona_type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(personaCount).map(([persona, count]) => ({
      name: persona,
      value: count,
      percentage: ((count / mockContacts.length) * 100).toFixed(1)
    }))
  }, [])

  const currentData = dataType === "country" ? countryData : personaData
  const title = dataType === "country" ? "Country-wise Distribution" : "Buyer Persona Distribution"

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-blue-600">
            {`Count: ${payload[0].value}`}
          </p>
          <p className="text-gray-600">
            {`Percentage: ${payload[0].payload.percentage}%`}
          </p>
        </div>
      )
    }
    return null
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Controls */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </CardTitle>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex gap-2">
              <Button
                variant={dataType === "country" ? "default" : "outline"}
                onClick={() => setDataType("country")}
                className="transition-all duration-200"
              >
                Country Distribution
              </Button>
              <Button
                variant={dataType === "persona" ? "default" : "outline"}
                onClick={() => setDataType("persona")}
                className="transition-all duration-200"
              >
                Persona Distribution
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={chartType === "pie" ? "default" : "outline"}
                onClick={() => setChartType("pie")}
                className="transition-all duration-200"
              >
                Pie Chart
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                onClick={() => setChartType("bar")}
                className="transition-all duration-200"
              >
                Bar Chart
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2">
              <motion.div
                key={`${chartType}-${dataType}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-96"
              >
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "pie" ? (
                    <PieChart>
                      <Pie
                        data={currentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {currentData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={customTooltip} />
                    </PieChart>
                  ) : (
                    <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip content={customTooltip} />
                      <Bar 
                        dataKey="value" 
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {currentData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Legend & Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {title}
              </h3>
              
              <div className="space-y-3">
                {currentData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium text-gray-700 truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">
                        {item.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.percentage}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Summary</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>Total Connections: <strong>{mockContacts.length}</strong></p>
                  <p>Categories: <strong>{currentData.length}</strong></p>
                  <p>
                    Top Category: <strong>
                      {currentData.sort((a, b) => b.value - a.value)[0]?.name}
                    </strong> ({currentData.sort((a, b) => b.value - a.value)[0]?.value} connections)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockContacts } from "@/lib/mock-data"
import { format, parseISO } from "date-fns"

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export const ConnectionVelocityChart = () => {
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedPersona, setSelectedPersona] = useState("all")

  const availableYears = useMemo(() => {
    const years = new Set(
      mockContacts.map(contact => 
        new Date(contact.connection_date).getFullYear().toString()
      )
    )
    return Array.from(years).sort()
  }, [])

  const availablePersonas = useMemo(() => {
    return Array.from(new Set(mockContacts.map(c => c.buyer_persona_type)))
  }, [])

  const chartData = useMemo(() => {
    // Filter contacts based on selected year and persona
    let filteredContacts = mockContacts.filter(contact => {
      const contactYear = new Date(contact.connection_date).getFullYear().toString()
      const yearMatch = contactYear === selectedYear
      const personaMatch = selectedPersona === "all" || contact.buyer_persona_type === selectedPersona
      return yearMatch && personaMatch
    })

    // Initialize all months with 0 connections
    const monthlyData = months.map((month, index) => ({
      month,
      connections: 0,
      monthIndex: index
    }))

    // Count connections per month
    filteredContacts.forEach(contact => {
      const connectionDate = new Date(contact.connection_date)
      const monthIndex = connectionDate.getMonth()
      monthlyData[monthIndex].connections++
    })

    return monthlyData
  }, [selectedYear, selectedPersona])

  const totalConnections = chartData.reduce((sum, data) => sum + data.connections, 0)
  const averagePerMonth = (totalConnections / 12).toFixed(1)
  const peakMonth = chartData.reduce((max, current) => 
    current.connections > max.connections ? current : max
  )

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{`${label} ${selectedYear}`}</p>
          <p className="text-blue-600 font-medium">
            {`Connections: ${payload[0].value}`}
          </p>
          {selectedPersona !== "all" && (
            <p className="text-gray-600 text-sm">
              {`Persona: ${selectedPersona}`}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Monthly Connection Velocity
          </CardTitle>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Persona:</label>
              <select
                value={selectedPersona}
                onChange={(e) => setSelectedPersona(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Personas</option>
                {availablePersonas.map(persona => (
                  <option key={persona} value={persona}>{persona}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chart */}
            <div className="lg:col-span-3">
              <motion.div
                key={`${selectedYear}-${selectedPersona}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-96"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={chartData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      fontSize={12}
                      tick={{ fill: '#6B7280' }}
                    />
                    <YAxis 
                      fontSize={12}
                      tick={{ fill: '#6B7280' }}
                      label={{ 
                        value: 'Connections', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: '#6B7280' }
                      }}
                    />
                    <Tooltip content={customTooltip} />
                    <Bar 
                      dataKey="connections" 
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                      animationBegin={0}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Stats Panel */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Statistics
                </h3>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="text-2xl font-bold text-blue-900">
                      {totalConnections}
                    </div>
                    <div className="text-sm text-blue-700">
                      Total Connections
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      in {selectedYear}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="p-4 bg-green-50 rounded-lg"
                  >
                    <div className="text-2xl font-bold text-green-900">
                      {averagePerMonth}
                    </div>
                    <div className="text-sm text-green-700">
                      Average per Month
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      connections/month
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="p-4 bg-purple-50 rounded-lg"
                  >
                    <div className="text-2xl font-bold text-purple-900">
                      {peakMonth.connections}
                    </div>
                    <div className="text-sm text-purple-700">
                      Peak Month
                    </div>
                    <div className="text-xs text-purple-600 mt-1">
                      {peakMonth.month} {selectedYear}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <h4 className="font-semibold text-gray-900 mb-2">Insights</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    📈 <strong>Growth Trend:</strong> {
                      totalConnections > 0 
                        ? `${totalConnections} connections made in ${selectedYear}`
                        : "No connections data for selected filters"
                    }
                  </p>
                  {peakMonth.connections > 0 && (
                    <p>
                      🎯 <strong>Best Month:</strong> {peakMonth.month} with {peakMonth.connections} connections
                    </p>
                  )}
                  <p>
                    📊 <strong>Consistency:</strong> {
                      chartData.filter(m => m.connections > 0).length
                    } active months out of 12
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Calendar, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockContacts } from "@/lib/mock-data"

const statsData = [
  {
    icon: Users,
    label: "Total Connections",
    value: mockContacts.length,
    change: "+12%",
    positive: true
  },
  {
    icon: TrendingUp,
    label: "This Month",
    value: 3,
    change: "+25%",
    positive: true
  },
  {
    icon: Calendar,
    label: "Active Days",
    value: 15,
    change: "+8%",
    positive: true
  },
  {
    icon: Globe,
    label: "Countries",
    value: new Set(mockContacts.map(c => c.location_country)).size,
    change: "+2",
    positive: true
  }
]

export const WelcomeCard = () => {
  const currentTime = new Date().getHours()
  const greeting = currentTime < 12 ? "Good Morning" : currentTime < 18 ? "Good Afternoon" : "Good Evening"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-xl">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {greeting}! 👋
            </CardTitle>
            <p className="text-gray-600 mt-2 text-lg">
              Welcome back to your LinkedIn Analytics Dashboard
            </p>
          </motion.div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.positive 
                        ? "text-green-700 bg-green-100" 
                        : "text-red-700 bg-red-100"
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value.toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm font-medium">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 p-4 bg-white rounded-xl border border-gray-100"
          >
            <p className="text-gray-600 text-center">
              🎯 <strong>Pro Tip:</strong> Your connection rate has increased by 18% this month! 
              Keep engaging with your network to maintain this growth.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
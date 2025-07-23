"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  BarChart3, 
  TrendingUp,
  Linkedin
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    description: "Overview & Analytics"
  },
  {
    id: "connections",
    label: "Connections",
    icon: Users,
    description: "Manage Contacts"
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "Charts & Insights"
  },
  {
    id: "velocity",
    label: "Connection Velocity",
    icon: TrendingUp,
    description: "Growth Tracking"
  }
]

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-blue-700/50">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2 bg-blue-600 rounded-lg">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">LinkedIn</h1>
                <p className="text-blue-200 text-sm">Dashboard</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-blue-700/50 transition-colors"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-white text-blue-900 shadow-lg" 
                  : "hover:bg-blue-700/50 text-blue-100"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0",
                isActive ? "text-blue-600" : "text-blue-200"
              )} />
              
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 text-left"
                  >
                    <div className={cn(
                      "font-medium text-sm",
                      isActive ? "text-blue-900" : "text-white"
                    )}>
                      {item.label}
                    </div>
                    <div className={cn(
                      "text-xs",
                      isActive ? "text-blue-600" : "text-blue-200"
                    )}>
                      {item.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700/50">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <p className="text-blue-200 text-xs">
                LinkedIn Analytics Dashboard
              </p>
              <p className="text-blue-300 text-xs mt-1">
                v1.0.0
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
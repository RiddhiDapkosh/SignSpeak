import { useState } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Sidebar } from './Sidebar'
import { Button } from '@/components/ui/Button'
import {
  Menu,
  Camera,
  Hand,
  FileText,
  Volume2,
  TrendingUp,
  Clock,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'

const stats = [
  {
    label: 'Total Signs Detected',
    value: '1,284',
    change: '+12%',
    icon: Hand,
    gradient: 'from-purple-500 to-primary-500',
  },
  {
    label: 'Sentences Generated',
    value: '326',
    change: '+8%',
    icon: FileText,
    gradient: 'from-primary-500 to-accent-500',
  },
  {
    label: 'Speech Generated',
    value: '198',
    change: '+15%',
    icon: Volume2,
    gradient: 'from-accent-500 to-purple-500',
  },
  {
    label: 'Accuracy Rate',
    value: '97.8%',
    change: '+2.3%',
    icon: TrendingUp,
    gradient: 'from-green-500 to-emerald-500',
  },
]

const recentActivity = [
  { type: 'sign', content: 'Detected "HELLO"', time: '2 min ago' },
  { type: 'sentence', content: 'Translated to Hindi: नमस्ते', time: '5 min ago' },
  { type: 'speech', content: 'Generated speech in English', time: '10 min ago' },
  { type: 'sign', content: 'Detected "THANK YOU"', time: '15 min ago' },
]

export function DashboardLayout() {
  const { user } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isDashboard = location.pathname === '/dashboard'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

      <div className="lg:pl-64">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isDashboard ? 'Dashboard' : getPageTitle(location.pathname)}
                </h1>
                {isDashboard && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0]}
                  </p>
                )}
              </div>
            </div>
            <Link to="/camera">
              <Button className="gap-2">
                <Camera className="w-4 h-4" />
                Start Translating
              </Button>
            </Link>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {isDashboard ? <DashboardContent /> : <Outlet />}
        </main>
      </div>
    </div>
  )
}

function DashboardContent() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const value = [45, 78, 56, 92, 68, 34, 51][index]
                return (
                  <div key={day} className="flex items-center gap-4">
                    <span className="w-10 text-sm text-gray-500 dark:text-gray-400">
                      {day}
                    </span>
                    <Progress value={value} className="flex-1" />
                    <span className="w-10 text-sm text-gray-900 dark:text-white text-right">
                      {value}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link
              to="/history"
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    {activity.type === 'sign' && <Hand className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                    {activity.type === 'sentence' && <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                    {activity.type === 'speech' && <Volume2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white truncate">
                      {activity.content}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/camera">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-primary-500 text-white cursor-pointer"
              >
                <Camera className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">Start Camera</h3>
                <p className="text-sm text-white/80">Begin real-time translation</p>
              </motion.div>
            </Link>
            <Link to="/history">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white cursor-pointer"
              >
                <Clock className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">View History</h3>
                <p className="text-sm text-white/80">Access past translations</p>
              </motion.div>
            </Link>
            <Link to="/analytics">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-accent-500 to-purple-500 text-white cursor-pointer"
              >
                <TrendingUp className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">Analytics</h3>
                <p className="text-sm text-white/80">Track your progress</p>
              </motion.div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getPageTitle(path: string): string {
  const titles: Record<string, string> = {
    '/camera': 'Camera Translator',
    '/history': 'History',
    '/analytics': 'Analytics',
    '/settings': 'Settings',
    '/profile': 'Profile',
  }
  return titles[path] || 'Dashboard'
}

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Camera, History, ChartBar as BarChart3, Settings, User, LogOut, ChevronLeft, ChevronRight, Sun, Moon, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Camera Translator', href: '/camera', icon: Camera },
  { name: 'History', href: '/history', icon: History },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Profile', href: '/profile', icon: User },
]

interface SidebarProps {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

export function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const { user, signOut } = useAuth()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center flex-shrink-0">
            <Camera className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-primary-500 bg-clip-text text-transparent">
              SignSpeak
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
            'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          {resolvedTheme === 'dark' ? (
            <>
              <Sun className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>Dark Mode</span>}
            </>
          )}
        </button>

        <button
          onClick={handleSignOut}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
            'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 256 }}
        className="hidden lg:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-16 z-40"
      >
        {sidebarContent}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 shadow-sm"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 lg:hidden"
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileOpen(false)} className="text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        {sidebarContent}
      </motion.aside>
    </>
  )
}

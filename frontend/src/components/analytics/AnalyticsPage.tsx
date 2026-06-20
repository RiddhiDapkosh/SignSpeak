import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { TrendingUp, ChartBar as BarChart3, ChartPie as PieChartIcon, Activity, Hand, FileText, Volume2, Globe, Download, Calendar } from 'lucide-react'

const dailyData = [
  { date: 'Mon', signs: 45, sentences: 12, speech: 8 },
  { date: 'Tue', signs: 78, sentences: 24, speech: 15 },
  { date: 'Wed', signs: 56, sentences: 18, speech: 10 },
  { date: 'Thu', signs: 92, sentences: 30, speech: 22 },
  { date: 'Fri', signs: 68, sentences: 22, speech: 16 },
  { date: 'Sat', signs: 34, sentences: 10, speech: 6 },
  { date: 'Sun', signs: 51, sentences: 16, speech: 11 },
]

const weeklyData = [
  { week: 'Week 1', signs: 245, sentences: 65 },
  { week: 'Week 2', signs: 312, sentences: 84 },
  { week: 'Week 3', signs: 278, sentences: 72 },
  { week: 'Week 4', signs: 356, sentences: 98 },
]

const accuracyData = [
  { range: '95-100%', count: 156 },
  { range: '90-95%', count: 89 },
  { range: '85-90%', count: 45 },
  { range: '80-85%', count: 23 },
  { range: '<80%', count: 12 },
]

const languageData = [
  { name: 'English', value: 45, color: '#a855f7' },
  { name: 'Hindi', value: 35, color: '#d946ef' },
  { name: 'Marathi', value: 20, color: '#c084fc' },
]

const signFrequency = [
  { sign: 'A', count: 124 },
  { sign: 'E', count: 98 },
  { sign: 'H', count: 87 },
  { sign: 'L', count: 76 },
  { sign: 'O', count: 72 },
  { sign: 'T', count: 68 },
  { sign: 'I', count: 54 },
  { sign: 'N', count: 51 },
].sort((a, b) => b.count - a.count)

const stats = [
  { label: 'Total Signs', value: '1,284', icon: Hand, change: '+12%', color: 'purple' },
  { label: 'Sentences Built', value: '326', icon: FileText, change: '+8%', color: 'primary' },
  { label: 'Speech Generated', value: '198', icon: Volume2, change: '+15%', color: 'accent' },
  { label: 'Translations', value: '142', icon: Globe, change: '+10%', color: 'green' },
]

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week')

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your translation progress and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
            <CardDescription>Signs, sentences, and speech generated per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorSigns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="signs"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSigns)"
                />
                <Line type="monotone" dataKey="sentences" stroke="#d946ef" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="speech" stroke="#22c55e" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Cumulative statistics over weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="week" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="signs" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sentences" fill="#d946ef" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Language Distribution</CardTitle>
            <CardDescription>Translation usage by language</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {languageData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy Distribution</CardTitle>
            <CardDescription>Prediction confidence ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={accuracyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis dataKey="range" type="category" stroke="#9ca3af" fontSize={12} width={70} />
                <Tooltip />
                <Bar dataKey="count" fill="#a855f7" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Detected Signs</CardTitle>
            <CardDescription>Top 8 ASL letters by frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {signFrequency.map((item, index) => (
                <motion.div
                  key={item.sign}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {item.sign}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.count} times
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Average Accuracy Trend</CardTitle>
          <CardDescription>Your prediction confidence over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyData.map((d, i) => ({ ...d, accuracy: 94 + Math.random() * 5 }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis domain={[90, 100]} stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

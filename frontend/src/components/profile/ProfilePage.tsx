import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { User, Mail, Calendar, Hand, FileText, Volume2, TrendingUp, Camera, CreditCard as Edit2, Save } from 'lucide-react'

export function ProfilePage() {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.user_metadata?.name || '')
  const [email] = useState(user?.email || '')

  const stats = [
    { label: 'Signs Detected', value: '1,284', icon: Hand, change: '+12%' },
    { label: 'Sentences Built', value: '326', icon: FileText, change: '+8%' },
    { label: 'Speech Generated', value: '198', icon: Volume2, change: '+15%' },
    { label: 'Avg Accuracy', value: '97.8%', icon: TrendingUp, change: '+2.3%' },
  ]

  const handleSave = () => {
    console.log('Saving profile:', { name, email })
    setEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account and view your statistics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center mx-auto mb-4">
                  {user?.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <button className="absolute bottom-4 right-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                  <Camera className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {name || email.split('@')[0]}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{email}</p>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
              </div>

              <div className="mt-6">
                {editing ? (
                  <Button onClick={handleSave} className="w-full gap-2">
                    <Save className="w-4 h-4" />
                    Save Profile
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setEditing(true)} className="w-full gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal details and account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  value={email}
                  disabled
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Email cannot be changed. Contact support for help.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Statistics</CardTitle>
          <CardDescription>Overview of your translation activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
              >
                <stat.icon className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">{stat.change}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { action: 'Translated "HELLO" to Hindi', time: '2 hours ago' },
                  { action: 'Built sentence "THANK YOU"', time: '4 hours ago' },
                  { action: 'Detected 45 signs today', time: '6 hours ago' },
                  { action: 'Generated speech in Marathi', time: 'Yesterday' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div>
                      <p className="text-gray-900 dark:text-white">{activity.action}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'First Sign', desc: 'Detect your first sign', unlocked: true },
                  { name: 'Speedster', desc: 'Detect 100 signs in a day', unlocked: true },
                  { name: 'Polyglot', desc: 'Use all 3 languages', unlocked: true },
                  { name: 'Sentence Builder', desc: 'Build 50 sentences', unlocked: false },
                  { name: 'Speaker', desc: 'Generate 100 speeches', unlocked: false },
                  { name: 'Accuracy Master', desc: 'Achieve 99% accuracy', unlocked: false },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl ${
                      achievement.unlocked
                        ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                        : 'bg-gray-50 dark:bg-gray-800/50 opacity-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center mb-2">
                      {achievement.unlocked ? (
                        <Hand className="w-6 h-6 text-white" />
                      ) : (
                        <span className="text-white text-lg">🔒</span>
                      )}
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{achievement.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

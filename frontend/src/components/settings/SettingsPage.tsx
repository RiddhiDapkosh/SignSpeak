import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import { Switch } from '@/components/ui/Switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useTheme } from '@/contexts/ThemeContext'
import {
  Settings as SettingsIcon,
  Palette,
  Volume2,
  Camera,
  Globe,
  Bell,
  Shield,
  Save,
  RotateCcw
} from 'lucide-react'

export function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const [settings, setSettings] = useState({
    speechSpeed: 1,
    voiceType: 'female',
    confidenceThreshold: 80,
    cameraResolution: 'medium',
    preferredLanguage: 'en',
    notifications: true,
    soundEffects: true,
    autoTranslate: false,
    autoSpeak: false,
    saveHistory: true,
    analyticsTracking: true,
  })

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  const handleReset = () => {
    setSettings({
      speechSpeed: 1,
      voiceType: 'female',
      confidenceThreshold: 80,
      cameraResolution: 'medium',
      preferredLanguage: 'en',
      notifications: true,
      soundEffects: true,
      autoTranslate: false,
      autoSpeak: false,
      saveHistory: true,
      analyticsTracking: true,
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Customize your SignSpeak experience
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="speech" className="gap-2">
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Speech</span>
          </TabsTrigger>
          <TabsTrigger value="camera" className="gap-2">
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Camera</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                Theme
              </CardTitle>
              <CardDescription>Choose your preferred color scheme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {['light', 'dark', 'system'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t as 'light' | 'dark' | 'system')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme === t
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className={`w-full aspect-video rounded-lg mb-3 ${
                      t === 'light' ? 'bg-white border border-gray-200' :
                      t === 'dark' ? 'bg-gray-900' :
                      'bg-gradient-to-br from-white to-gray-900'
                    }`} />
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{t}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
              <CardDescription>Set your preferred language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select
                  value={settings.preferredLanguage}
                  onChange={(e) => setSettings({ ...settings, preferredLanguage: e.target.value })}
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi (हिंदी)</option>
                  <option value="mr">Marathi (मराठी)</option>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="speech" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-purple-600" />
                Speech Settings
              </CardTitle>
              <CardDescription>Configure text-to-speech options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Speech Speed</Label>
                  <Select
                    value={settings.speechSpeed.toString()}
                    onChange={(e) => setSettings({ ...settings, speechSpeed: parseFloat(e.target.value) })}
                  >
                    <option value="0.5">0.5x (Slowest)</option>
                    <option value="0.75">0.75x (Slow)</option>
                    <option value="1">1x (Normal)</option>
                    <option value="1.25">1.25x (Fast)</option>
                    <option value="1.5">1.5x (Fastest)</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Voice Type</Label>
                  <Select
                    value={settings.voiceType}
                    onChange={(e) => setSettings({ ...settings, voiceType: e.target.value })}
                  >
                    <option value="female">Female Voice</option>
                    <option value="male">Male Voice</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-speak translations</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically speak when translation is generated
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoSpeak}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoSpeak: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sound Effects</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Play sound when sign is detected
                    </p>
                  </div>
                  <Switch
                    checked={settings.soundEffects}
                    onCheckedChange={(checked) => setSettings({ ...settings, soundEffects: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="camera" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-600" />
                Camera Settings
              </CardTitle>
              <CardDescription>Configure camera and detection options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Camera Resolution</Label>
                  <Select
                    value={settings.cameraResolution}
                    onChange={(e) => setSettings({ ...settings, cameraResolution: e.target.value })}
                  >
                    <option value="low">Low (480p)</option>
                    <option value="medium">Medium (720p)</option>
                    <option value="high">High (1080p)</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Confidence Threshold</Label>
                  <Select
                    value={settings.confidenceThreshold.toString()}
                    onChange={(e) => setSettings({ ...settings, confidenceThreshold: parseInt(e.target.value) })}
                  >
                    <option value="70">70% (More sensitive)</option>
                    <option value="80">80% (Balanced)</option>
                    <option value="90">90% (More accurate)</option>
                    <option value="95">95% (Most accurate)</option>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-translate</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically translate when sentence is built
                  </p>
                </div>
                <Switch
                  checked={settings.autoTranslate}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoTranslate: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Privacy & Data
              </CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Save Translation History</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Keep a record of your translations
                  </p>
                </div>
                <Switch
                  checked={settings.saveHistory}
                  onCheckedChange={(checked) => setSettings({ ...settings, saveHistory: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Analytics Tracking</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Help us improve by sharing anonymous usage data
                  </p>
                </div>
                <Switch
                  checked={settings.analyticsTracking}
                  onCheckedChange={(checked) => setSettings({ ...settings, analyticsTracking: checked })}
                />
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">
                  Delete All History
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-6 right-6 flex gap-2">
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}

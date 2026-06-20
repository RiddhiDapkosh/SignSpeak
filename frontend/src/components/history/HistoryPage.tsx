import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Search, ListFilter as Filter, Trash2, Download, Clock, Hand, FileText, Volume2, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HistoryItem {
  id: string
  type: 'sign' | 'sentence' | 'translation' | 'speech'
  content: string
  details?: string
  timestamp: Date
}

const mockHistory: HistoryItem[] = [
  { id: '1', type: 'sign', content: 'A', details: 'Confidence: 98.4%', timestamp: new Date(Date.now() - 60000) },
  { id: '2', type: 'sign', content: 'B', details: 'Confidence: 97.8%', timestamp: new Date(Date.now() - 120000) },
  { id: '3', type: 'sentence', content: 'HELLO', details: '5 letters combined', timestamp: new Date(Date.now() - 300000) },
  { id: '4', type: 'translation', content: 'HELLO', details: 'Hindi: नमस्ते', timestamp: new Date(Date.now() - 360000) },
  { id: '5', type: 'speech', content: 'HELLO', details: 'English, 1x speed', timestamp: new Date(Date.now() - 600000) },
  { id: '6', type: 'sign', content: 'C', details: 'Confidence: 99.1%', timestamp: new Date(Date.now() - 900000) },
  { id: '7', type: 'sentence', content: 'THANK YOU', details: '8 letters combined', timestamp: new Date(Date.now() - 1200000) },
  { id: '8', type: 'translation', content: 'THANK YOU', details: 'Hindi: धन्यवाद', timestamp: new Date(Date.now() - 1500000) },
]

export function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const filteredHistory = useMemo(() => {
    let items = [...mockHistory]

    if (searchQuery) {
      items = items.filter(item =>
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filterType !== 'all') {
      items = items.filter(item => item.type === filterType)
    }

    if (sortBy === 'recent') {
      items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    } else {
      items.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    }

    return items
  }, [searchQuery, filterType, sortBy])

  const getIcon = (type: string) => {
    switch (type) {
      case 'sign': return Hand
      case 'sentence': return FileText
      case 'translation': return Globe
      case 'speech': return Volume2
      default: return Clock
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const handleDelete = (id: string) => {
    console.log('Deleting', id)
  }

  const handleExport = () => {
    const data = JSON.stringify(filteredHistory, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'signspeak-history.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">History</h1>
        <p className="text-gray-500 dark:text-gray-400">
          View and manage your translation history
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="sign">Signs</option>
                <option value="sentence">Sentences</option>
                <option value="translation">Translations</option>
                <option value="speech">Speech</option>
              </Select>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
              </Select>
              <Button variant="outline" onClick={handleExport} className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="gap-2">
            <Clock className="w-4 h-4" />
            All ({mockHistory.length})
          </TabsTrigger>
          <TabsTrigger value="signs" className="gap-2">
            <Hand className="w-4 h-4" />
            Signs
          </TabsTrigger>
          <TabsTrigger value="sentences" className="gap-2">
            <FileText className="w-4 h-4" />
            Sentences
          </TabsTrigger>
          <TabsTrigger value="translations" className="gap-2">
            <Globe className="w-4 h-4" />
            Translations
          </TabsTrigger>
          <TabsTrigger value="speech" className="gap-2">
            <Volume2 className="w-4 h-4" />
            Speech
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-3">
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center',
                          item.type === 'sign' && 'bg-purple-100 dark:bg-purple-900/30',
                          item.type === 'sentence' && 'bg-primary-100 dark:bg-primary-900/30',
                          item.type === 'translation' && 'bg-accent-100 dark:bg-accent-900/30',
                          item.type === 'speech' && 'bg-green-100 dark:bg-green-900/30',
                        )}>
                          {(() => {
                            const Icon = getIcon(item.type)
                            return <Icon className={cn(
                              'w-6 h-6',
                              item.type === 'sign' && 'text-purple-600 dark:text-purple-400',
                              item.type === 'sentence' && 'text-primary-600 dark:text-primary-400',
                              item.type === 'translation' && 'text-accent-600 dark:text-accent-400',
                              item.type === 'speech' && 'text-green-600 dark:text-green-400',
                            )} />
                          })()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {item.content}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.details}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatTime(item.timestamp)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {['signs', 'sentences', 'translations', 'speech'].map(tab => (
          <TabsContent key={tab} value={tab}>
            <div className="space-y-3">
              {filteredHistory
                .filter(item => {
                  if (tab === 'signs') return item.type === 'sign'
                  if (tab === 'sentences') return item.type === 'sentence'
                  if (tab === 'translations') return item.type === 'translation'
                  if (tab === 'speech') return item.type === 'speech'
                  return true
                })
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {item.content}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.details}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatTime(item.timestamp)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No history found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start translating to build your history
          </p>
        </div>
      )}
    </div>
  )
}

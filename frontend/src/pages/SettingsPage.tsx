import { DashboardLayout } from '@/components/dashboard'
import { SettingsPage as SettingsPageContent } from '@/components/settings'

export function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsPageContent />
    </DashboardLayout>
  )
}

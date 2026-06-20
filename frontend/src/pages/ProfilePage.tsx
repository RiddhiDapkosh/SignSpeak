import { DashboardLayout } from '@/components/dashboard'
import { ProfilePage as ProfilePageContent } from '@/components/profile'

export function ProfilePage() {
  return (
    <DashboardLayout>
      <ProfilePageContent />
    </DashboardLayout>
  )
}

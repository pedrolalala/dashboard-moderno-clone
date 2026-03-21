import { useSharePointData } from '@/hooks/useSharePointData'
import { AccountSummaryCards } from '@/components/accounts/AccountSummaryCards'
import { AccountTable } from '@/components/accounts/AccountTable'
import { AccountGrowthChart } from '@/components/accounts/AccountGrowthChart'
import { AccountTypeChart } from '@/components/accounts/AccountTypeChart'
import { Skeleton } from '@/components/ui/skeleton'

export default function Accounts() {
  const { accounts, accountHistory, loading } = useSharePointData()

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[350px] rounded-xl" />
          <Skeleton className="lg:col-span-1 h-[350px] rounded-xl" />
        </div>
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Deep Dive</h1>
        <p className="text-muted-foreground">
          Detailed financial data and metrics synchronized from SharePoint.
        </p>
      </div>

      <AccountSummaryCards accounts={accounts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AccountGrowthChart data={accountHistory} />
        </div>
        <div className="lg:col-span-1">
          <AccountTypeChart accounts={accounts} />
        </div>
      </div>

      <AccountTable data={accounts} />
    </div>
  )
}

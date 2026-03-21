import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { AccountData } from '@/hooks/useSharePointData'

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
]

const chartConfig = {
  value: { label: 'Accounts' },
}

export function AccountTypeChart({ accounts }: { accounts: AccountData[] }) {
  const data = useMemo(() => {
    const types = accounts.reduce(
      (acc, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(types).map(([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length],
    }))
  }, [accounts])

  if (!data || data.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-[300px] items-center justify-center text-muted-foreground">
          No data available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm border-border/40 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Account Types</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px] flex items-center justify-center">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

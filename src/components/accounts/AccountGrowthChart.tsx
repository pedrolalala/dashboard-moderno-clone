import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { AccountHistoryData } from '@/hooks/useSharePointData'

const chartConfig = {
  balance: {
    label: 'Balance',
    color: 'hsl(var(--chart-1))',
  },
}

export function AccountGrowthChart({ data }: { data: AccountHistoryData[] }) {
  if (!data || data.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-[300px] items-center justify-center text-muted-foreground">
          No data available for Account Growth
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm border-border/40 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Account Growth (Revenue)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-balance)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-balance)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              strokeOpacity={0.4}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--color-balance)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillBalance)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

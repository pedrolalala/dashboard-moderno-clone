import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { InventoryData } from '@/hooks/useSharePointData'

const chartConfig = {
  quantity: { label: 'Total Stock', color: 'hsl(var(--chart-2))' },
}

export function InventoryStockChart({
  inventory,
}: {
  inventory: InventoryData[]
}) {
  const data = useMemo(() => {
    const categories = inventory.reduce(
      (acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.quantity
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(categories).map(([category, quantity]) => ({
      category,
      quantity,
    }))
  }, [inventory])

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
        <CardTitle className="text-base font-semibold">
          Stock Levels by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              strokeOpacity={0.4}
            />
            <XAxis
              dataKey="category"
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
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)' }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="quantity"
              fill="var(--color-quantity)"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

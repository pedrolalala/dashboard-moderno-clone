import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from '@/components/ui/chart'
import { AccountHistoryData } from '@/hooks/useSharePointData'

const chartConfig = {
  entradas: {
    label: 'Entradas',
    color: 'hsl(var(--chart-1))',
  },
  saidas: {
    label: 'Saídas',
    color: 'hsl(var(--chart-2))',
  },
}

export function AccountGrowthChart({ data }: { data: AccountHistoryData[] }) {
  if (!data || data.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-[300px] items-center justify-center text-muted-foreground">
          Nenhum dado disponível
        </CardContent>
      </Card>
    )
  }

  const formatMonth = (dateString: string) => {
    const [, month] = dateString.split('-')
    const months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ]
    return months[parseInt(month, 10) - 1]
  }

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
  }

  return (
    <Card className="shadow-sm border-border/40 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Fluxo de Caixa
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillEntradas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-entradas)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-entradas)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillSaidas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-saidas)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-saidas)"
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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              tickFormatter={formatMonth}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `R$ ${value / 1000}k`}
            />
            <Tooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => formatDate(label as string)}
                  formatter={(value) =>
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(value as number)
                  }
                />
              }
            />
            <Legend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="saidas"
              stroke="var(--color-saidas)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillSaidas)"
            />
            <Area
              type="monotone"
              dataKey="entradas"
              stroke="var(--color-entradas)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillEntradas)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

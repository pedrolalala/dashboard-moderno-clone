import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

export function Charts({ data }: { data: any[] }) {
  const trendMap = data.reduce(
    (acc, curr) => {
      const date = curr.dt_vencimento.split('T')[0]
      acc[date] = (acc[date] || 0) + curr.vl_parcela
      return acc
    },
    {} as Record<string, number>,
  )

  const trendData = Object.entries(trendMap)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, value]) => ({
      date: date.split('-').reverse().slice(0, 2).join('/'),
      value,
    }))

  const groupMap = data.reduce(
    (acc, curr) => {
      const group = curr.desc_grupo || 'Outros'
      acc[group] = (acc[group] || 0) + curr.vl_parcela
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(groupMap).map(([name, value]) => ({
    name,
    value,
  }))
  const COLORS = [
    '#3b82f6',
    '#10b981',
    '#facc15',
    '#8b5cf6',
    '#64748b',
    '#d97706',
    '#a8a29e',
    '#0ea5e9',
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Evolução de Despesas por Vencimento
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{ value: { color: 'hsl(var(--primary))' } }}>
            <BarChart data={trendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `R$ ${v}`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Distribuição por Grupo</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={{}}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

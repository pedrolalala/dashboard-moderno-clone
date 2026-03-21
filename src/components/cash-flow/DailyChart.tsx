import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { cashFlowDaily } from '@/lib/mock-data'

const chartConfig = {
  receita: {
    label: 'Receita',
    color: '#3b82f6',
  },
  despesa: {
    label: 'Despesas',
    color: '#ef4444',
  },
}

export function DailyChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-full min-h-[250px] aspect-auto mt-4"
    >
      <BarChart
        data={cashFlowDaily}
        margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#333"
          vertical={true}
          horizontal={true}
        />
        <XAxis
          dataKey="day"
          stroke="#888"
          tick={{ fill: '#888', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => (val % 5 === 0 && val !== 0 ? val : '')}
          label={{
            value: 'Dia',
            position: 'bottom',
            fill: '#888',
            fontSize: 11,
          }}
        />
        <YAxis
          stroke="#888"
          tick={{ fill: '#888', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => `${val} Mi`}
          label={{
            value: 'Receita e Despesas',
            angle: -90,
            position: 'insideLeft',
            fill: '#888',
            fontSize: 11,
            dy: 50,
            dx: -10,
          }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: '12px', color: '#fff', top: -30, left: 0 }}
          align="left"
          verticalAlign="top"
        />
        <Bar dataKey="receita" fill="var(--color-receita)" barSize={6} />
        <Bar dataKey="despesa" fill="var(--color-despesa)" barSize={6} />
      </BarChart>
    </ChartContainer>
  )
}

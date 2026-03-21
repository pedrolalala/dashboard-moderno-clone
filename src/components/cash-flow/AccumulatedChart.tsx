import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  value: {
    label: 'Saldo Acumulado',
    color: '#3b82f6',
  },
}

interface AccumulatedChartProps {
  data: any[]
}

export function AccumulatedChart({ data }: AccumulatedChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-full min-h-[250px] aspect-auto mt-4"
    >
      <AreaChart
        data={data}
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
            value: 'Saldo Acumulado Previsto (dia)',
            angle: -90,
            position: 'insideLeft',
            fill: '#888',
            fontSize: 11,
            dy: 70,
            dx: -10,
          }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="step"
          dataKey="value"
          stroke="var(--color-value)"
          fill="#1d4ed8"
          fillOpacity={1}
          strokeWidth={2}
          dot={{ r: 3, fill: '#fff', stroke: '#3b82f6', strokeWidth: 1 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ChartContainer>
  )
}

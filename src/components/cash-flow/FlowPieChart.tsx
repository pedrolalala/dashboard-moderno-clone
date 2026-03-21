import { Cell, Legend, Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  receita: {
    label: 'Receita',
    color: '#1d4ed8',
  },
  despesa: {
    label: 'Despesas',
    color: '#b91c1c',
  },
}

interface FlowPieChartProps {
  data: any[]
}

export function FlowPieChart({ data }: FlowPieChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-full min-h-[250px] aspect-auto flex items-center justify-center"
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ cx, cy, midAngle, outerRadius, percent, value }) => {
            const RADIAN = Math.PI / 180
            const radius = outerRadius * 1.3
            const x = cx + radius * Math.cos(-midAngle * RADIAN)
            const y = cy + radius * Math.sin(-midAngle * RADIAN)
            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize="11"
                className="font-medium transition-all duration-300"
              >
                <tspan x={x} dy="-0.6em">{`${value} Mi`}</tspan>
                <tspan
                  x={x}
                  dy="1.2em"
                >{`(${(percent * 100).toFixed(2)}%)`}</tspan>
              </text>
            )
          }}
          outerRadius={85}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconType="circle"
          wrapperStyle={{ fontSize: '11px', color: '#fff' }}
        />
      </PieChart>
    </ChartContainer>
  )
}

import { Cell, Legend, Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { cashFlowPie } from '@/lib/mock-data'

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

export function FlowPieChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-full min-h-[250px] aspect-auto flex items-center justify-center"
    >
      <PieChart>
        <Pie
          data={cashFlowPie}
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
                className="font-medium"
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
          {cashFlowPie.map((entry, index) => (
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

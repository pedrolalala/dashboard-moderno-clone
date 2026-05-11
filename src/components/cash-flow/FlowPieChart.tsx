import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const chartConfig = {
  Despesas: {
    label: 'Despesas',
    color: '#ef4444',
  },
  Receita: {
    label: 'Receita',
    color: '#3b82f6',
  },
  'Distrib. Lucro': {
    label: 'Distribuição',
    color: '#f59e0b',
  },
}

interface FlowPieChartProps {
  data: any[]
  onCategoryClick?: (category: string) => void
}

export function FlowPieChart({ data, onCategoryClick }: FlowPieChartProps) {
  const handleClick = (entry: any) => {
    if (!onCategoryClick) return
    if (entry.name === 'Receita') onCategoryClick('receita')
    if (entry.name === 'Despesas') onCategoryClick('despesa')
    if (entry.name === 'Distrib. Lucro') onCategoryClick('distribuicao_lucro')
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-full min-h-[250px] aspect-auto flex justify-center mt-2"
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          onClick={handleClick}
          className="cursor-pointer outline-none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill}
              className="hover:opacity-80 transition-opacity duration-300 outline-none"
            />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}

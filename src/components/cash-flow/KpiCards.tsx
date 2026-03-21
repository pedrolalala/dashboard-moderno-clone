import { Card } from '@/components/ui/card'

export interface KpiData {
  title: string
  value: string
  topText: string
  subtitle: string
}

interface KpiCardsProps {
  data: KpiData[]
}

export function KpiCards({ data }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 shrink-0">
      {data.map((kpi, i) => (
        <div key={i} className="flex flex-col flex-1">
          <div className="text-center mb-1 h-10 flex flex-col justify-end pb-1">
            <div className="text-[#60a5fa] text-[11px] font-bold tracking-wide">
              {kpi.topText}
            </div>
            <div
              className="text-white/70 text-[10px] truncate px-1"
              title={kpi.subtitle}
            >
              {kpi.subtitle}
            </div>
          </div>
          <Card className="bg-[#3b424d] border-none text-center py-6 rounded-sm shadow-md flex flex-col justify-center min-h-[110px] transition-all duration-300">
            <div className="text-3xl font-bold text-white mb-2 tracking-tight transition-all duration-300">
              {kpi.value}
            </div>
            <div className="text-sm text-white/90">{kpi.title}</div>
          </Card>
        </div>
      ))}
    </div>
  )
}

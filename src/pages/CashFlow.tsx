import { ArrowLeft } from 'lucide-react'
import { FiltersSidebar } from '@/components/cash-flow/FiltersSidebar'
import { KpiCards } from '@/components/cash-flow/KpiCards'
import { AccumulatedChart } from '@/components/cash-flow/AccumulatedChart'
import { DailyChart } from '@/components/cash-flow/DailyChart'
import { FlowPieChart } from '@/components/cash-flow/FlowPieChart'

export default function CashFlow() {
  return (
    <div className="flex flex-col h-full bg-[#1e242b] text-white max-w-[1600px] mx-auto overflow-hidden animate-fade-in">
      <div className="flex items-center gap-4 mb-4 shrink-0 pt-2 px-2">
        <button className="text-gray-400 hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-full border border-gray-600/50 hover:bg-white/5">
          <ArrowLeft className="w-5 h-5 opacity-80" />
        </button>
        <h1 className="text-3xl font-bold tracking-wide text-white">
          Lucenera
        </h1>
      </div>

      <div className="flex flex-1 gap-8 min-h-0 px-2">
        <FiltersSidebar />

        <div className="flex-1 flex flex-col gap-8 overflow-y-auto custom-scrollbar pb-6 pr-4">
          <KpiCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[320px]">
            <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-[13px] font-bold text-white mb-2 ml-2">
                Saldo Acumulado Previsto (dia) por Dia
              </h3>
              <div className="flex-1 min-h-0">
                <AccumulatedChart />
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col">
              <h3 className="text-[13px] font-bold text-white mb-2 text-center w-full">
                Despesas e Receita
              </h3>
              <div className="flex-1 min-h-0 relative">
                <FlowPieChart />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[320px]">
            <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-[13px] font-bold text-white mb-2 ml-2">
                Receita e Despesas por Dia
              </h3>
              <div className="flex-1 min-h-0">
                <DailyChart />
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col justify-end pb-8 px-4">
              <div className="bg-[#3b424d] p-6 rounded-sm flex flex-col justify-center items-center h-28 shadow-md">
                <div className="text-3xl font-bold text-white mb-1 tracking-tight">
                  28,04 Mi
                </div>
                <div className="text-sm text-white/90">Despesa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useMemo } from 'react'
import { ArrowLeft, Building2 } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { format, subDays } from 'date-fns'
import { FiltersSidebar } from '@/components/cash-flow/FiltersSidebar'
import { KpiCards } from '@/components/cash-flow/KpiCards'
import { AccumulatedChart } from '@/components/cash-flow/AccumulatedChart'
import { DailyChart } from '@/components/cash-flow/DailyChart'
import { FlowPieChart } from '@/components/cash-flow/FlowPieChart'
import { TransactionsTable } from '@/components/cash-flow/TransactionsTable'
import {
  cashFlowAccumulated,
  cashFlowDaily,
  cashFlowPie,
} from '@/lib/mock-data'

export default function CashFlow() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [company, setCompany] = useState('all')

  const factor = useMemo(() => {
    let f = 1
    if (dateRange?.from && dateRange?.to) {
      const diffDays = Math.ceil(
        Math.abs(dateRange.to.getTime() - dateRange.from.getTime()) /
          (1000 * 60 * 60 * 24),
      )
      f = Math.max(0.5, diffDays / 30)
    }
    if (company !== 'all') f *= 0.65
    return f
  }, [dateRange, company])

  const dynamicKpis = useMemo(
    () => [
      {
        title: 'a Receber',
        value: `${(25.98 * factor).toFixed(2)} Mi`,
        topText: '0,00%',
        subtitle: '% ValorParcela vs Mês Anterior',
      },
      {
        title: 'Soma de ValorPago',
        value: `${(15.9 * factor).toFixed(2)} Mi`,
        topText: '+0,01%',
        subtitle: '% ValorParcela vs Mês Anterior',
      },
      {
        title: 'Soma de Despesas',
        value: `${(12.14 * factor).toFixed(2)} Mi`,
        topText: '-0,79%',
        subtitle: '% ValorParcela vs Mês Anterior',
      },
      {
        title: 'Saldo',
        value: `${(-2.76 * factor).toFixed(2)} Mi`,
        topText: '0,00%',
        subtitle: 'Saldo projetado no período selecionado',
      },
    ],
    [factor],
  )

  const dynamicAccumulated = useMemo(
    () =>
      cashFlowAccumulated.map((d) => ({
        ...d,
        value: Number((d.value * factor).toFixed(2)),
      })),
    [factor],
  )

  const dynamicDaily = useMemo(
    () =>
      cashFlowDaily.map((d) => ({
        ...d,
        receita: Number((d.receita * factor).toFixed(2)),
        despesa: Number((d.despesa * factor).toFixed(2)),
      })),
    [factor],
  )

  const dynamicPie = useMemo(() => {
    const totalReceita = dynamicDaily.reduce(
      (acc, curr) => acc + curr.receita,
      0,
    )
    const totalDespesa = dynamicDaily.reduce(
      (acc, curr) => acc + curr.despesa,
      0,
    )
    const sum = totalReceita + totalDespesa
    return [
      {
        name: 'Despesas',
        value: Number(totalDespesa.toFixed(2)),
        percent: totalDespesa / sum,
        fill: '#b91c1c',
      },
      {
        name: 'Receita',
        value: Number(totalReceita.toFixed(2)),
        percent: totalReceita / sum,
        fill: '#1d4ed8',
      },
    ]
  }, [dynamicDaily])

  const dynamicTransactions = useMemo(() => {
    const numTransactions = Math.max(3, Math.floor(8 * factor))
    return Array.from({ length: numTransactions }).map((_, i) => ({
      id: `tx-${i}`,
      date: format(subDays(dateRange?.to || new Date(), i * 2), 'dd/MM/yyyy'),
      description: i % 2 === 0 ? 'Pagamento Fornecedor' : 'Recebimento Cliente',
      category: i % 2 === 0 ? 'Operacional' : 'Vendas',
      value: Number(((Math.random() * 5 + 1) * factor).toFixed(2)),
      type: i % 2 === 0 ? ('despesa' as const) : ('receita' as const),
      status: i === 0 ? 'Pendente' : 'Concluído',
    }))
  }, [factor, dateRange])

  const totalDespesaLabel = useMemo(() => {
    return dynamicDaily.reduce((acc, curr) => acc + curr.despesa, 0).toFixed(2)
  }, [dynamicDaily])

  return (
    <div className="flex flex-col h-full bg-[#1e242b] text-white max-w-[1600px] mx-auto overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between gap-4 mb-4 shrink-0 pt-2 px-2">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-full border border-gray-600/50 hover:bg-white/5">
            <ArrowLeft className="w-5 h-5 opacity-80" />
          </button>
          <h1 className="text-3xl font-bold tracking-wide text-white">
            Lucenera
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-[#3b424d] px-3 py-1.5 rounded-md border border-white/10 shadow-sm">
          <Building2 className="w-4 h-4 text-white/60" />
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-transparent text-[13px] font-medium text-white/90 border-none outline-none cursor-pointer focus:ring-0 [&>option]:bg-[#3b424d]"
          >
            <option value="all">Todas as Empresas</option>
            <option value="lucenera">LUCE NERA</option>
            <option value="foco">FOCO ILUMINACAO</option>
            <option value="islight">ISLIGHT</option>
          </select>
        </div>
      </div>

      <div className="flex flex-1 gap-8 min-h-0 px-2">
        <FiltersSidebar date={dateRange} setDate={setDateRange} />

        <div className="flex-1 flex flex-col gap-8 overflow-y-auto custom-scrollbar pb-6 pr-4">
          <KpiCards data={dynamicKpis} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[320px] shrink-0">
            <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-[13px] font-bold text-white mb-2 ml-2">
                Saldo Acumulado Previsto (dia) por Dia
              </h3>
              <div className="flex-1 min-h-0">
                <AccumulatedChart data={dynamicAccumulated} />
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col">
              <h3 className="text-[13px] font-bold text-white mb-2 text-center w-full">
                Despesas e Receita
              </h3>
              <div className="flex-1 min-h-0 relative">
                <FlowPieChart data={dynamicPie} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[320px] shrink-0">
            <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-[13px] font-bold text-white mb-2 ml-2">
                Receita e Despesas por Dia
              </h3>
              <div className="flex-1 min-h-0">
                <DailyChart data={dynamicDaily} />
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col justify-end pb-8 px-4">
              <div className="bg-[#3b424d] p-6 rounded-sm flex flex-col justify-center items-center h-28 shadow-md transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1 tracking-tight">
                  {totalDespesaLabel} Mi
                </div>
                <div className="text-sm text-white/90">Despesa Total</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col shrink-0 mt-2">
            <h3 className="text-[15px] font-bold text-white mb-4 ml-2">
              Lançamentos do Período
            </h3>
            <TransactionsTable data={dynamicTransactions} />
          </div>
        </div>
      </div>
    </div>
  )
}

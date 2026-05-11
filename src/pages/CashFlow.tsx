import { useState, useMemo, useEffect } from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { format, subDays, parseISO } from 'date-fns'
import { FiltersSidebar } from '@/components/cash-flow/FiltersSidebar'
import { KpiCards } from '@/components/cash-flow/KpiCards'
import { AccumulatedChart } from '@/components/cash-flow/AccumulatedChart'
import { DailyChart } from '@/components/cash-flow/DailyChart'
import { FlowPieChart } from '@/components/cash-flow/FlowPieChart'
import { TransactionsTable } from '@/components/cash-flow/TransactionsTable'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

const formatCurrencyCompact = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    style: 'currency',
    currency: 'BRL',
  }).format(value)

export default function CashFlow() {
  const { user } = useAuth()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [transactions, setTransactions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        let query = supabase
          .from('v_cash_flow_lucenera')
          .select('*')
          .in('categoria_fluxo', ['receita', 'despesa', 'distribuicao_lucro'])
          .not('vl_pago', 'is', null)

        if (dateRange?.from) {
          query = query.gte(
            'dt_pagamento',
            format(dateRange.from, 'yyyy-MM-dd'),
          )
        }
        if (dateRange?.to) {
          query = query.lte('dt_pagamento', format(dateRange.to, 'yyyy-MM-dd'))
        }

        const { data, error } = await query
        if (error) throw error

        setTransactions(data || [])
      } catch (err) {
        console.error('Error fetching cash flow data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateRange, user])

  const { dailyData, totalReceita, totalDespesa, totalDistribuicao } =
    useMemo(() => {
      const map = new Map<
        string,
        { date: Date; receita: number; despesa: number; distribuicao: number }
      >()

      transactions.forEach((tx) => {
        if (!tx.dt_pagamento || !tx.vl_pago) return
        const key = tx.dt_pagamento.substring(0, 10) // Extracts YYYY-MM-DD safely

        if (!map.has(key)) {
          map.set(key, {
            date: parseISO(key),
            receita: 0,
            despesa: 0,
            distribuicao: 0,
          })
        }

        const current = map.get(key)!
        const value = Number(tx.vl_pago)

        if (tx.categoria_fluxo === 'receita') {
          current.receita += value
        } else if (tx.categoria_fluxo === 'despesa') {
          current.despesa += value
        } else if (tx.categoria_fluxo === 'distribuicao_lucro') {
          current.distribuicao += value
        }
      })

      const sorted = Array.from(map.values()).sort(
        (a, b) => a.date.getTime() - b.date.getTime(),
      )

      let tr = 0
      let td = 0
      let tdist = 0

      const daily = sorted.map((d) => {
        tr += d.receita
        td += d.despesa
        tdist += d.distribuicao
        return {
          day: format(d.date, 'dd/MM'),
          receita: Number(d.receita.toFixed(2)),
          despesa: Number(d.despesa.toFixed(2)),
          distribuicao: Number(d.distribuicao.toFixed(2)),
        }
      })

      return {
        dailyData: daily,
        totalReceita: tr,
        totalDespesa: td,
        totalDistribuicao: tdist,
      }
    }, [transactions])

  const dynamicAccumulated = useMemo(() => {
    let running = 0
    return dailyData.map((d) => {
      running += d.receita - d.despesa - d.distribuicao
      return {
        day: d.day,
        value: Number(running.toFixed(2)),
      }
    })
  }, [dailyData])

  const dynamicPie = useMemo(() => {
    const sum = totalReceita + totalDespesa + totalDistribuicao
    return [
      {
        name: 'Despesas',
        value: Number(totalDespesa.toFixed(2)),
        percent: sum > 0 ? totalDespesa / sum : 0,
        fill: '#ef4444',
      },
      {
        name: 'Receita',
        value: Number(totalReceita.toFixed(2)),
        percent: sum > 0 ? totalReceita / sum : 0,
        fill: '#3b82f6',
      },
      {
        name: 'Distrib. Lucro',
        value: Number(totalDistribuicao.toFixed(2)),
        percent: sum > 0 ? totalDistribuicao / sum : 0,
        fill: '#f59e0b',
      },
    ].filter((d) => d.value > 0)
  }, [totalReceita, totalDespesa, totalDistribuicao])

  const dynamicTransactions = useMemo(() => {
    let filtered = transactions

    if (searchTerm) {
      filtered = filtered.filter((tx) =>
        tx.descricao?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (tx) => tx.categoria_fluxo === selectedCategory,
      )
    }

    return filtered
      .map((tx, i) => ({
        id: `tx-${i}`,
        date: tx.dt_pagamento
          ? format(parseISO(tx.dt_pagamento.substring(0, 10)), 'dd/MM/yyyy')
          : '-',
        description: tx.descricao || 'Sem descrição',
        category:
          tx.categoria_fluxo === 'distribuicao_lucro'
            ? 'Distribuição de Lucro'
            : tx.categoria_fluxo === 'receita'
              ? 'Receita'
              : 'Despesa',
        value: Number(tx.vl_pago) || 0,
        type: tx.categoria_fluxo as
          | 'receita'
          | 'despesa'
          | 'distribuicao_lucro',
        status: 'Concluído',
      }))
      .sort((a, b) => {
        const da =
          a.date !== '-'
            ? new Date(a.date.split('/').reverse().join('-')).getTime()
            : 0
        const db =
          b.date !== '-'
            ? new Date(b.date.split('/').reverse().join('-')).getTime()
            : 0
        return db - da
      })
  }, [transactions, searchTerm, selectedCategory])

  const dynamicKpis = useMemo(() => {
    const saldoOperacional = totalReceita - totalDespesa
    const saldoFinal = saldoOperacional - totalDistribuicao

    return [
      {
        title: 'Receitas Realizadas',
        value: formatCurrencyCompact(totalReceita),
        topText: 'ENTRADAS',
        subtitle: 'Soma de recebimentos no período',
      },
      {
        title: 'Despesas Operacionais',
        value: formatCurrencyCompact(totalDespesa),
        topText: 'SAÍDAS',
        subtitle: 'Soma de despesas operacionais no período',
      },
      {
        title: 'Saldo Operacional',
        value: formatCurrencyCompact(saldoOperacional),
        topText: 'RESULTADO OPERACIONAL',
        subtitle: 'Receitas - Despesas Operacionais',
      },
      {
        title: 'Saldo Final de Caixa',
        value: formatCurrencyCompact(saldoFinal),
        topText: 'RESULTADO LÍQUIDO',
        subtitle: 'Saldo Operacional - Distribuição de Lucros',
      },
    ]
  }, [totalReceita, totalDespesa, totalDistribuicao])

  const totalDespesaLabel = formatCurrencyCompact(totalDespesa)

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
      </div>

      <div className="flex flex-1 gap-8 min-h-0 px-2">
        <FiltersSidebar date={dateRange} setDate={setDateRange} />

        <div className="flex-1 flex flex-col gap-8 overflow-y-auto custom-scrollbar pb-6 pr-4 relative">
          {isLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#1e242b]/50 backdrop-blur-sm rounded-md">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          )}

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
                <FlowPieChart
                  data={dynamicPie}
                  onCategoryClick={(cat) => {
                    setSelectedCategory((prev) => (prev === cat ? null : cat))
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[320px] shrink-0">
            <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-[13px] font-bold text-white mb-2 ml-2">
                Receita e Despesas por Dia
              </h3>
              <div className="flex-1 min-h-0">
                <DailyChart data={dailyData} />
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col justify-end pb-8 px-4">
              <div className="bg-[#3b424d] p-6 rounded-sm flex flex-col justify-center items-center h-28 shadow-md transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1 tracking-tight">
                  {totalDespesaLabel}
                </div>
                <div className="text-sm text-white/90">Despesa Total</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col shrink-0 mt-2">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-[15px] font-bold text-white">
                Lançamentos do Período
              </h3>
              <div className="flex items-center gap-3">
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="bg-[#3b424d] text-[13px] text-white/90 border border-white/10 rounded-md px-3 py-1.5 outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Todas Categorias</option>
                  <option value="receita">Receita</option>
                  <option value="despesa">Despesa Operacional</option>
                  <option value="distribuicao_lucro">
                    Distribuição de Lucro
                  </option>
                </select>
                <input
                  type="text"
                  placeholder="Filtrar por descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#3b424d] text-[13px] text-white/90 border border-white/10 rounded-md px-3 py-1.5 outline-none focus:border-blue-500 transition-colors w-64 placeholder:text-white/40"
                />
              </div>
            </div>
            <TransactionsTable data={dynamicTransactions} />
          </div>
        </div>
      </div>
    </div>
  )
}

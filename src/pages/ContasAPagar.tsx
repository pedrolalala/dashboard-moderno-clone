import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { contasAPagarData } from '@/lib/mock-data-contas-pagar'
import { KpiCards } from '@/components/contas-a-pagar/KpiCards'
import { Charts } from '@/components/contas-a-pagar/Charts'
import { DataTable } from '@/components/contas-a-pagar/DataTable'

export default function ContasAPagar() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 8, 1),
    to: new Date(2023, 11, 31),
  })

  const filteredData = useMemo(() => {
    return contasAPagarData.filter((item) => {
      const itemDate = new Date(item.dt_vencimento)
      if (date?.from && itemDate < date.from) return false
      if (date?.to && itemDate > date.to) return false
      return true
    })
  }, [date])

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 w-full max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contas a Pagar</h2>
          <p className="text-muted-foreground mt-1">
            Gestão de despesas e vencimentos
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-[260px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'dd/MM/yyyy')} -{' '}
                      {format(date.to, 'dd/MM/yyyy')}
                    </>
                  ) : (
                    format(date.from, 'dd/MM/yyyy')
                  )
                ) : (
                  <span>Selecione um período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <KpiCards data={filteredData} />

      <Charts data={filteredData} />

      <div className="mt-8 overflow-hidden">
        <h3 className="text-xl font-semibold mb-4">Detalhamento de Contas</h3>
        <DataTable data={filteredData} />
      </div>
    </div>
  )
}

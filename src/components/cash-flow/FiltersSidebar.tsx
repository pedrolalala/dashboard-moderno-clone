import { DateRange } from 'react-day-picker'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'

interface FiltersSidebarProps {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
}

export function FiltersSidebar({ date, setDate }: FiltersSidebarProps) {
  return (
    <div className="w-56 shrink-0 flex flex-col gap-6 overflow-y-auto pr-2">
      <div>
        <h3 className="text-sm font-semibold text-white/90 mb-3">
          Período de Análise
        </h3>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="bg-[#3b424d] p-4 rounded-md shadow-sm border border-white/5 mt-4">
        <h4 className="text-[11px] font-bold text-white/50 mb-2 uppercase tracking-wider">
          Dica de Visualização
        </h4>
        <p className="text-[13px] text-white/70 leading-relaxed">
          O filtro de <strong>Empresa</strong> foi movido para o cabeçalho
          global. Utilize-o para filtrar todas as visões simultaneamente sem
          repetir informações nas tabelas.
        </p>
      </div>
    </div>
  )
}

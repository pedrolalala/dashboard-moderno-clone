import * as React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal bg-[#3b424d] border-none text-white hover:bg-[#4b5563] hover:text-white transition-colors',
              !date && 'text-white/60',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'dd MMM, yyyy', { locale: ptBR })} -{' '}
                    {format(date.to, 'dd MMM, yyyy', { locale: ptBR })}
                  </>
                ) : (
                  format(date.from, 'dd MMM, yyyy', { locale: ptBR })
                )
              ) : (
                'Selecionar data'
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-none shadow-xl"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
            className="bg-[#1e242b] text-white border border-white/10 rounded-md"
            classNames={{
              day_selected:
                'bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white',
              day_today: 'bg-white/10 text-white',
              day_outside: 'text-white/30',
              day: 'text-white hover:bg-white/10',
              head_cell: 'text-white/60',
              nav_button: 'text-white hover:bg-white/10',
              nav_button_previous: 'text-white hover:bg-white/10',
              nav_button_next: 'text-white hover:bg-white/10',
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

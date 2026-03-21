import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export interface Transaction {
  id: string
  date: string
  description: string
  category: string
  value: number
  type: 'receita' | 'despesa'
  status: string
}

export function TransactionsTable({ data }: { data: Transaction[] }) {
  return (
    <div className="rounded-md border border-white/10 bg-[#3b424d] overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-black/20">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white/70 font-semibold h-10">
              Data
            </TableHead>
            <TableHead className="text-white/70 font-semibold h-10">
              Descrição
            </TableHead>
            <TableHead className="text-white/70 font-semibold h-10">
              Categoria
            </TableHead>
            <TableHead className="text-right text-white/70 font-semibold h-10">
              Valor
            </TableHead>
            <TableHead className="text-center text-white/70 font-semibold h-10">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((tx) => (
            <TableRow
              key={tx.id}
              className="border-white/10 hover:bg-white/5 transition-colors"
            >
              <TableCell className="font-medium text-white/90 py-3">
                {tx.date}
              </TableCell>
              <TableCell className="text-white/80 py-3">
                {tx.description}
              </TableCell>
              <TableCell className="text-white/80 py-3">
                {tx.category}
              </TableCell>
              <TableCell
                className={cn(
                  'text-right font-medium py-3',
                  tx.type === 'receita' ? 'text-blue-400' : 'text-red-400',
                )}
              >
                {tx.type === 'receita' ? '+' : '-'} {tx.value.toFixed(2)} Mi
              </TableCell>
              <TableCell className="text-center py-3">
                <span
                  className={cn(
                    'px-2.5 py-1 rounded-full text-[11px] font-medium border',
                    tx.status === 'Concluído'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : tx.status === 'Pendente'
                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        : 'bg-white/10 text-white/80 border-white/20',
                  )}
                >
                  {tx.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-white/50">
                Nenhum lançamento encontrado para o período selecionado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

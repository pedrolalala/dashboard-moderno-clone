import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InventoryData } from '@/hooks/useSharePointData'

export function InventoryTable({ data }: { data: InventoryData[] }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  const filteredData = useMemo(() => {
    if (!search) return data
    return data.filter(
      (d) =>
        d.itemName.toLowerCase().includes(search.toLowerCase()) ||
        d.supplier.toLowerCase().includes(search.toLowerCase()),
    )
  }, [data, search])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  )

  const getInventoryStatus = (quantity: number) => {
    if (quantity === 0) return 'Sem estoque'
    if (quantity < 20) return 'Estoque baixo'
    return 'Em estoque'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em estoque':
        return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'Estoque baixo':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
      case 'Sem estoque':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  if (data.length === 0) {
    return (
      <Card className="shadow-sm border-border/40 p-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <Search className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">Nenhum estoque encontrado</h3>
          <p className="text-sm text-muted-foreground">
            Não há dados de estoque disponíveis da integração.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm border-border/40">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
        <CardTitle className="text-lg font-semibold">
          Detalhes do Estoque
        </CardTitle>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="pl-8"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => {
                  const status = getInventoryStatus(row.quantity)
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium text-muted-foreground">
                        {row.supplier}
                      </TableCell>
                      <TableCell>{row.itemName}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            row.quantity < 20
                              ? 'text-destructive font-medium'
                              : ''
                          }
                        >
                          {row.quantity}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(row.unitPrice)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(status)}
                        >
                          {status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum dado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <div className="text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Próximo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, AlertCircle, Clock, CheckCircle } from 'lucide-react'

export function KpiCards({ data }: { data: any[] }) {
  const totalAPagar = data.reduce((acc, curr) => acc + curr.vl_parcela, 0)
  const totalPago = data.reduce((acc, curr) => acc + curr.vl_pago, 0)
  const emAberto = data
    .filter((d) => d.pago !== 'S')
    .reduce((acc, curr) => acc + curr.vl_parcela, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const vencidos = data
    .filter((d) => {
      const venc = new Date(d.dt_vencimento)
      venc.setHours(0, 0, 0, 0)
      return venc < today && d.pago !== 'S'
    })
    .reduce((acc, curr) => acc + curr.vl_parcela, 0)

  const format = (v: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(v)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total a Pagar
          </CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{format(totalAPagar)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Pago
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {format(totalPago)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Em Aberto
          </CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-500">
            {format(emAberto)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Vencidos
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {format(vencidos)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

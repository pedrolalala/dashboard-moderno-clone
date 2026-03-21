import { useSharePointData } from '@/hooks/useSharePointData'
import { InventoryStockChart } from '@/components/inventory/InventoryStockChart'
import { LowStockAlerts } from '@/components/inventory/LowStockAlerts'
import { InventoryTable } from '@/components/inventory/InventoryTable'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Package, AlertCircle, ShoppingCart } from 'lucide-react'

export default function Inventory() {
  const { inventory, loading } = useSharePointData()

  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground animate-pulse mb-4">
          Carregando...
        </p>
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[350px] rounded-xl" />
          <Skeleton className="lg:col-span-1 h-[350px] rounded-xl" />
        </div>
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    )
  }

  const totalItems = inventory.reduce((acc, curr) => acc + curr.quantity, 0)
  const lowStockCount = inventory.filter(
    (i) => i.quantity > 0 && i.quantity < 20,
  ).length
  const outOfStockCount = inventory.filter((i) => i.quantity === 0).length

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
        <p className="text-muted-foreground">
          Níveis abrangentes de estoque e detalhamento por categoria.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card shadow-sm border-border/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Total de Itens
              </p>
              <h3 className="text-3xl font-bold text-foreground">
                {totalItems.toLocaleString('pt-BR')}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm border-border/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Alertas de Estoque
              </p>
              <h3 className="text-3xl font-bold text-foreground">
                {lowStockCount}
              </h3>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm border-border/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Sem estoque
              </p>
              <h3 className="text-3xl font-bold text-foreground">
                {outOfStockCount}
              </h3>
            </div>
            <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InventoryStockChart inventory={inventory} />
        </div>
        <div className="lg:col-span-1">
          <LowStockAlerts inventory={inventory} />
        </div>
      </div>

      <InventoryTable data={inventory} />
    </div>
  )
}

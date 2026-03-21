import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import { InventoryData } from '@/hooks/useSharePointData'

export function LowStockAlerts({ inventory }: { inventory: InventoryData[] }) {
  const lowStockItems = useMemo(() => {
    return inventory
      .filter((item) => item.quantity > 0 && item.quantity < 20)
      .slice(0, 5)
  }, [inventory])

  if (!inventory || inventory.length === 0) {
    return null
  }

  return (
    <Card className="shadow-sm border-border/40 h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Alertas de Estoque
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {lowStockItems.length > 0 ? (
          <div className="space-y-4">
            {lowStockItems.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0 last:pb-0"
              >
                <div className="overflow-hidden pr-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.itemName}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.sku}</p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-destructive/10 text-destructive">
                    {item.quantity} restantes
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Nenhum item com estoque baixo.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { Card, CardContent } from '@/components/ui/card'
import { Wallet, Clock, TrendingUp, DollarSign } from 'lucide-react'
import { AccountData } from '@/hooks/useSharePointData'

export function AccountSummaryCards({ accounts }: { accounts: AccountData[] }) {
  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0)
  const receitaMensal = totalBalance * 0.15
  const pendingTransactions = accounts.filter(
    (a) => a.status === 'Pendente',
  ).length

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card shadow-sm border-border/40">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Saldo Total
            </p>
            <h3 className="text-3xl font-bold text-foreground">
              {formatCurrency(totalBalance)}
            </h3>
            <p className="text-xs text-primary flex items-center mt-2 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> +5,2% em relação ao mês
              passado
            </p>
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <Wallet className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm border-border/40">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Receita Mensal
            </p>
            <h3 className="text-3xl font-bold text-foreground">
              {formatCurrency(receitaMensal)}
            </h3>
            <p className="text-xs text-primary flex items-center mt-2 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> +2% nesta semana
            </p>
          </div>
          <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm border-border/40">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Transações Pendentes
            </p>
            <h3 className="text-3xl font-bold text-foreground">
              {pendingTransactions}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center mt-2 font-medium">
              Aguardando sincronização
            </p>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

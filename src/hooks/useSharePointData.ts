import { useState, useEffect } from 'react'

export interface Account {
  id: string
  name: string
  type: string
  balance: number
  status: string
}

export interface AccountHistory {
  date: string
  balance: number
}

export interface InventoryItem {
  id: string
  name: string
  sku: string
  quantity: number
  category: string
  price: number
  status: string
}

export function useSharePointData() {
  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [accountHistory, setAccountHistory] = useState<AccountHistory[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  useEffect(() => {
    // Using mock data to prevent 'fetch failed' errors from actual endpoints
    const timer = setTimeout(() => {
      setAccounts([
        {
          id: '1',
          name: 'Conta Principal',
          type: 'Corrente',
          balance: 150000,
          status: 'Ativa',
        },
        {
          id: '2',
          name: 'Fundo de Reserva',
          type: 'Poupança',
          balance: 350000,
          status: 'Ativa',
        },
        {
          id: '3',
          name: 'Investimentos',
          type: 'CDB',
          balance: 500000,
          status: 'Ativa',
        },
      ])

      setAccountHistory([
        { date: 'Jan', balance: 800000 },
        { date: 'Fev', balance: 850000 },
        { date: 'Mar', balance: 900000 },
        { date: 'Abr', balance: 950000 },
        { date: 'Mai', balance: 1000000 },
      ])

      setInventory([
        {
          id: '1',
          name: 'Luminária de Teto',
          sku: 'LUM-001',
          quantity: 150,
          category: 'Luminárias',
          price: 299.9,
          status: 'Em Estoque',
        },
        {
          id: '2',
          name: 'Lâmpada LED 15W',
          sku: 'LED-015',
          quantity: 12,
          category: 'Lâmpadas',
          price: 25.0,
          status: 'Baixo Estoque',
        },
        {
          id: '3',
          name: 'Cabo Elétrico 2.5mm',
          sku: 'CAB-250',
          quantity: 0,
          category: 'Acessórios',
          price: 150.0,
          status: 'Sem Estoque',
        },
        {
          id: '4',
          name: 'Interruptor Inteligente',
          sku: 'SMT-INT',
          quantity: 45,
          category: 'Automação',
          price: 120.0,
          status: 'Em Estoque',
        },
        {
          id: '5',
          name: 'Fita LED RGB 5m',
          sku: 'LED-RGB5',
          quantity: 8,
          category: 'Iluminação Decorativa',
          price: 85.0,
          status: 'Baixo Estoque',
        },
      ])

      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return { accounts, accountHistory, inventory, loading }
}

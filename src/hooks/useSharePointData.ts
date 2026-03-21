import { useState, useEffect, useMemo } from 'react'

export interface AccountData {
  id: string
  name: string
  type: string
  balance: number
  status: string
  lastSync: string
}

export interface InventoryData {
  id: string
  itemName: string
  sku: string
  supplier: string
  category: string
  quantity: number
  unitPrice: number
}

export interface AccountHistoryData {
  date: string
  entradas: number
  saidas: number
}

export function useSharePointData() {
  const [loading, setLoading] = useState(true)

  const accounts = useMemo<AccountData[]>(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: `ACC-${1000 + i}`,
      name: `Conta Corporativa ${i + 1}`,
      type: ['Corrente', 'Poupança', 'Investimento', 'Crédito'][i % 4],
      balance: 1000 + ((i * 2500) % 80000),
      status: i % 7 === 0 ? 'Pendente' : i % 11 === 0 ? 'Cancelado' : 'Pago',
      lastSync: new Date(Date.now() - i * 100000000)
        .toISOString()
        .split('T')[0],
    }))
  }, [])

  const inventory = useMemo<InventoryData[]>(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: `INV-${5000 + i}`,
      itemName: `Item ${i + 1} - ${['Pro', 'Max', 'Lite', 'Basic'][i % 4]}`,
      sku: `SKU-${10000 + i * 7}`,
      supplier: `Fornecedor ${['A', 'B', 'C', 'D'][i % 4]}`,
      category: ['Eletrônicos', 'Móveis', 'Papelaria', 'Software'][i % 4],
      quantity: i % 15 === 0 ? 0 : (i * 13) % 150,
      unitPrice: 10 + ((i * 5) % 300),
    }))
  }, [])

  const accountHistory = useMemo<AccountHistoryData[]>(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const d = new Date(2023, i, 15)
      return {
        date: d.toISOString().split('T')[0],
        entradas: 200000 + i * 15000 + (i % 3 === 0 ? -5000 : 10000),
        saidas: 150000 + i * 10000 + (i % 2 === 0 ? 5000 : -2000),
      }
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return { accounts, inventory, accountHistory, loading }
}

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
  category: string
  quantity: number
  unitPrice: number
}

export interface AccountHistoryData {
  month: string
  balance: number
}

export function useSharePointData() {
  const [loading, setLoading] = useState(true)

  const accounts = useMemo<AccountData[]>(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: `ACC-${1000 + i}`,
      name: `Corporate Account ${i + 1}`,
      type: ['Checking', 'Savings', 'Investment', 'Credit'][i % 4],
      balance: 1000 + ((i * 2500) % 80000),
      status: i % 7 === 0 ? 'Pending' : i % 11 === 0 ? 'Inactive' : 'Active',
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
      category: ['Electronics', 'Furniture', 'Stationery', 'Software'][i % 4],
      quantity: (i * 13) % 150,
      unitPrice: 10 + ((i * 5) % 300),
    }))
  }, [])

  const accountHistory = useMemo<AccountHistoryData[]>(() => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    return months.map((month, i) => ({
      month,
      balance: 400000 + i * 15000 + (i % 3 === 0 ? -5000 : 10000),
    }))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return { accounts, inventory, accountHistory, loading }
}

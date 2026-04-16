import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DataTable({ data }: { data: any[] }) {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const sortedData = useMemo(() => {
    if (!sortField) return data
    return [...data].sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]

      if (sortField === 'dt_vencimento') {
        aVal = aVal ? new Date(aVal).getTime() : 0
        bVal = bVal ? new Date(bVal).getTime() : 0
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortField, sortDir])

  const formatCurrency = (v: number | null | undefined) =>
    v != null
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(v)
      : '-'
  const formatDate = (d: string | null) => {
    if (!d) return '-'
    const parts = d.split('T')[0].split('-')
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`
    return d
  }

  const getStatusBadge = (item: any) => {
    if (item.pago === 'S')
      return (
        <Badge variant="default" className="bg-green-600">
          Pago
        </Badge>
      )
    const isOverdue = new Date(item.dt_vencimento) < new Date()
    if (isOverdue) return <Badge variant="destructive">Vencido</Badge>
    return <Badge variant="secondary">Pendente</Badge>
  }

  const columns = [
    { key: 'pago', label: 'Status', render: (row: any) => getStatusBadge(row) },
    {
      key: 'dt_vencimento',
      label: 'Vencimento',
      sortable: true,
      render: (row: any) => formatDate(row.dt_vencimento),
    },
    { key: 'nome_pessoa', label: 'Fornecedor', sortable: true },
    {
      key: 'vl_parcela',
      label: 'Valor',
      sortable: true,
      render: (row: any) => formatCurrency(row.vl_parcela),
    },
    { key: 'TipoOperacao', label: 'Tipo Operação' },
    { key: 'cod_empresa', label: 'Cód Empresa' },
    { key: 'nm_empresa', label: 'Nome Empresa' },
    { key: 'desc_perfil_empresa', label: 'Perfil Empresa' },
    { key: 'cod_duplicata', label: 'Cód Duplicata' },
    { key: 'cod_itens_duplicata', label: 'Cód Itens' },
    { key: 'acordo', label: 'Acordo' },
    { key: 'tipo_nota', label: 'Tipo Nota' },
    { key: 'cod_venda', label: 'Cód Venda' },
    { key: 'num_nota', label: 'Núm Nota' },
    { key: 'n_documento', label: 'Núm Documento' },
    { key: 'antecipacao', label: 'Antecipação' },
    { key: 'dev_troca', label: 'Dev. Troca' },
    { key: 'cod_saida_pgto', label: 'Cód Saída Pgto' },
    { key: 'cod_apropriacao', label: 'Cód Apropriação' },
    { key: 'desc_apropriacao', label: 'Desc Apropriação' },
    { key: 'cod_grupo', label: 'Cód Grupo' },
    { key: 'desc_grupo', label: 'Desc Grupo' },
    { key: 'cod_sub_grupo', label: 'Cód Sub Grupo' },
    { key: 'desc_sub_grupo', label: 'Desc Sub Grupo' },
    { key: 'cod_conta', label: 'Cód Conta' },
    { key: 'desc_conta', label: 'Desc Conta' },
    { key: 'desc_condpagto', label: 'Cond. Pgto' },
    { key: 'tipo_pagamento', label: 'Tipo Pgto' },
    { key: 'num_parc', label: 'Núm Parc' },
    { key: 'total_parc', label: 'Total Parc' },
    { key: 'cod_pessoa', label: 'Cód Pessoa' },
    { key: 'tel_pessoa', label: 'Telefone' },
    { key: 'email_financeiro', label: 'Email Financeiro' },
    { key: 'nm_funcionario', label: 'Funcionário' },
    {
      key: 'dt_emissao',
      label: 'Emissão',
      render: (row: any) => formatDate(row.dt_emissao),
    },
    {
      key: 'dt_pagamento',
      label: 'Pagamento',
      render: (row: any) => formatDate(row.dt_pagamento),
    },
    {
      key: 'data_baixa',
      label: 'Data Baixa',
      render: (row: any) => formatDate(row.data_baixa),
    },
    {
      key: 'dt_ultimo_pgto',
      label: 'Últ. Pgto',
      render: (row: any) => formatDate(row.dt_ultimo_pgto),
    },
    {
      key: 'vl_duplicata',
      label: 'Vl Duplicata',
      render: (row: any) => formatCurrency(row.vl_duplicata),
    },
    {
      key: 'vl_desconto',
      label: 'Desconto',
      render: (row: any) => formatCurrency(row.vl_desconto),
    },
    {
      key: 'vl_juros',
      label: 'Juros',
      render: (row: any) => formatCurrency(row.vl_juros),
    },
    {
      key: 'vl_pago',
      label: 'Vl Pago',
      render: (row: any) => formatCurrency(row.vl_pago),
    },
    {
      key: 'vl_frete',
      label: 'Frete',
      render: (row: any) => formatCurrency(row.vl_frete),
    },
    {
      key: 'vl_ipi',
      label: 'IPI',
      render: (row: any) => formatCurrency(row.vl_ipi),
    },
    {
      key: 'vl_st',
      label: 'ST',
      render: (row: any) => formatCurrency(row.vl_st),
    },
    { key: 'lancamento', label: 'Lançamento' },
    { key: 'layout_boleto', label: 'Layout Boleto' },
    { key: 'nosso_numero', label: 'Nosso Número' },
    { key: 'obs_conta_pagar', label: 'Obs' },
  ]

  return (
    <div className="rounded-md border bg-card">
      <div className="overflow-x-auto max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-12rem)] pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className="whitespace-nowrap">
                  {col.sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(col.key)}
                      className="-ml-4 h-8 data-[state=open]:bg-accent font-medium"
                    >
                      {col.label} <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key} className="whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

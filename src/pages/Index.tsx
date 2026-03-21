import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table'
import { tableData, estoqueData, showroomData, pieData } from '@/lib/mock-data'

const formatCurrency = (val: number) =>
  val.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export default function Index() {
  return (
    <div className="flex flex-col h-full gap-4 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
        <Card className="bg-[#2d333b] border-[#3b424d] text-center py-6 rounded-md shadow-sm">
          <div className="text-3xl font-bold text-white mb-1 tracking-tight">
            596,92 Mil
          </div>
          <div className="text-sm text-white/80">CMV "Negativos"</div>
        </Card>
        <Card className="bg-[#2d333b] border-[#3b424d] text-center py-6 rounded-md shadow-sm">
          <div className="text-3xl font-bold text-white mb-1 tracking-tight">
            1,53 Mi
          </div>
          <div className="text-sm text-white/80">Venda "negativos"</div>
        </Card>
        <Card className="bg-[#2d333b] border-[#3b424d] text-center py-6 rounded-md shadow-sm">
          <div className="text-3xl font-bold text-white mb-1 tracking-tight">
            1,95 Mi
          </div>
          <div className="text-sm text-white/80">CMV "Disponível"</div>
        </Card>
        <Card className="bg-[#2d333b] border-[#3b424d] text-center py-6 rounded-md shadow-sm">
          <div className="text-3xl font-bold text-white mb-1 tracking-tight">
            4,96 Mi
          </div>
          <div className="text-sm text-white/80">Venda "Disponível"</div>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 gap-4 min-h-[600px]">
        <div className="flex flex-col lg:w-2/3 gap-4">
          <Card className="flex-1 bg-[#2d333b] border-[#3b424d] p-4 flex flex-col min-h-[250px]">
            <h3 className="text-lg font-semibold text-white mb-2">Estoque</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={estoqueData}
                  layout="vertical"
                  margin={{ left: 60, right: 20, top: 10, bottom: 20 }}
                >
                  <XAxis
                    type="number"
                    ticks={[0, 0.2, 0.4, 0.6, 0.8]}
                    tickFormatter={(val) =>
                      `${val.toString().replace('.', ',')} Mi`
                    }
                    stroke="#555"
                    tick={{ fill: '#aaa', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="marca"
                    stroke="#555"
                    tick={{ fill: '#fff', fontSize: 10, fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip
                    cursor={{ fill: '#3b424d' }}
                    contentStyle={{
                      backgroundColor: '#1e242b',
                      border: '1px solid #3b424d',
                      color: '#fff',
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: '11px',
                      color: '#fff',
                      paddingBottom: '10px',
                    }}
                  />
                  <Bar dataKey="SKUs_Total_Geral" fill="#3b82f6" barSize={0} />
                  <Bar
                    dataKey="Valor_Disponivel_Venda"
                    fill="#fbbf24"
                    barSize={16}
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="Perc_SKUs_Por_Marca"
                    fill="#0ea5e9"
                    barSize={0}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="flex flex-col md:flex-row flex-1 gap-4 min-h-[250px]">
            <Card className="flex-[1.2] bg-[#2d333b] border-[#3b424d] p-2 flex flex-col min-h-0">
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: -40 }}>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      innerRadius={0}
                      label={({ percent }) =>
                        percent > 0.05 ? `${(percent * 100).toFixed(1)}%` : ''
                      }
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ fontSize: '10px', color: '#fff' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e242b',
                        border: '1px solid #3b424d',
                        color: '#fff',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="flex-1 bg-[#2d333b] border-[#3b424d] p-4 flex flex-col min-h-0">
              <div className="text-center mb-2">
                <div className="text-xl font-bold text-white tracking-tight">
                  1,34 Mi
                </div>
                <div className="text-xs text-white/80">
                  Valor_Showroom_Custo
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={showroomData}
                    layout="vertical"
                    margin={{ left: 60, right: 10, top: 0, bottom: 0 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="marca"
                      stroke="#555"
                      tick={{ fill: '#fff', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={80}
                      label={{
                        value: 'Marca',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#fff',
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    />
                    <Tooltip
                      cursor={{ fill: '#3b424d' }}
                      contentStyle={{
                        backgroundColor: '#1e242b',
                        border: '1px solid #3b424d',
                        color: '#fff',
                      }}
                    />
                    <Bar
                      dataKey="valor"
                      fill="#3b82f6"
                      barSize={12}
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

        <Card className="lg:w-1/3 bg-[#2d333b] border-[#3b424d] flex flex-col overflow-hidden min-h-[400px]">
          <div className="flex-1 overflow-auto">
            <Table className="text-xs text-white/90">
              <TableHeader className="bg-[#252a31] sticky top-0 z-10">
                <TableRow className="border-b border-[#3b424d] hover:bg-transparent">
                  <TableHead className="text-white font-semibold h-9 whitespace-nowrap">
                    Marca
                  </TableHead>
                  <TableHead className="text-white font-semibold h-9 text-right whitespace-nowrap">
                    Valor_Disponivel_Custo
                  </TableHead>
                  <TableHead className="text-white font-semibold h-9 text-right whitespace-nowrap">
                    Valor_Disponivel_Venda
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, i) => (
                  <TableRow
                    key={i}
                    className="border-b border-[#3b424d]/50 hover:bg-white/5 h-8"
                  >
                    <TableCell className="py-1 px-4 font-medium">
                      {row.marca}
                    </TableCell>
                    <TableCell className="py-1 px-4 text-right tabular-nums">
                      {formatCurrency(row.custo)}
                    </TableCell>
                    <TableCell className="py-1 px-4 text-right tabular-nums">
                      {formatCurrency(row.venda)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="bg-[#252a31] sticky bottom-0 z-10 border-t border-[#3b424d]">
                <TableRow className="hover:bg-transparent h-9">
                  <TableCell className="py-1 px-4 font-bold text-white">
                    Total
                  </TableCell>
                  <TableCell className="py-1 px-4 text-right font-bold text-white tabular-nums">
                    1.945.711,80
                  </TableCell>
                  <TableCell className="py-1 px-4 text-right font-bold text-white tabular-nums">
                    4.957.183,06
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}

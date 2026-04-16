import * as React from 'react'
import { ResponsiveContainer } from 'recharts'

export function ChartContainer({ children, config, className }: any) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        ...Object.entries(config || {}).reduce(
          (acc, [k, v]: any) => ({ ...acc, [`--color-${k}`]: v.color }),
          {},
        ),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export function ChartTooltip({ content }: any) {
  return null
}

export function ChartTooltipContent({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-md">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: p.color || p.payload?.fill }}
            />
            <span className="text-muted-foreground capitalize">{p.name}:</span>
            <span className="font-medium text-foreground">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(p.value)}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

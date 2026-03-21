import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function Header() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-[#252a31] border-b border-[#3b424d] shrink-0">
      <h1 className="text-2xl font-bold text-white tracking-wide w-full md:w-auto mb-4 md:mb-0">
        Lucenera
      </h1>
      <div className="flex flex-col items-start w-full md:w-auto">
        <label className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">
          Marca
        </label>
        <Select defaultValue="todos">
          <SelectTrigger className="w-full md:w-[200px] h-8 bg-[#1e242b] border-[#3b424d] text-white text-sm focus:ring-0">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent className="bg-[#2d333b] border-[#3b424d] text-white">
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="interlight">INTERLIGHT</SelectItem>
            <SelectItem value="ubiqua">UBIQUA</SelectItem>
            <SelectItem value="iluminar">ILUMINAR</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}

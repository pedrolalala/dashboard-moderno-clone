import { Checkbox } from '@/components/ui/checkbox'
import { ChevronDown, ChevronRight } from 'lucide-react'

export function FiltersSidebar() {
  return (
    <div className="w-56 shrink-0 flex flex-col gap-6 overflow-y-auto pr-2">
      <div>
        <h3 className="text-sm font-semibold text-white/90 mb-3">
          Ano, Mês, Dia
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 pl-4">
            <Checkbox
              id="all"
              className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
            />
            <label htmlFor="all" className="text-xs text-white/80">
              Seleciona...
            </label>
          </div>
          <div className="flex items-center space-x-2 pl-1">
            <ChevronDown className="w-3 h-3 text-gray-500" />
            <Checkbox
              id="blank"
              className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
            />
            <label htmlFor="blank" className="text-xs text-white/80">
              (Em bran...
            </label>
          </div>
          <div className="flex items-center space-x-2 pl-1">
            <ChevronDown className="w-3 h-3 text-gray-500" />
            <Checkbox
              id="2024"
              className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
            />
            <label htmlFor="2024" className="text-xs text-white/80">
              2024
            </label>
          </div>
          <div className="flex items-center space-x-2 pl-1">
            <ChevronDown className="w-3 h-3 text-gray-500" />
            <Checkbox
              id="2025"
              className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
            />
            <label htmlFor="2025" className="text-xs text-white/80">
              2025
            </label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 pl-1">
              <ChevronDown className="w-3 h-3 text-white/80" />
              <Checkbox
                id="2026"
                className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
              />
              <label htmlFor="2026" className="text-xs text-white/80">
                2026
              </label>
            </div>
            <div className="pl-6 space-y-2 border-l border-white/10 ml-[10px]">
              <div className="flex items-center space-x-2">
                <ChevronDown className="w-3 h-3 text-gray-500" />
                <Checkbox
                  id="jan"
                  className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
                />
                <label htmlFor="jan" className="text-xs text-white/80">
                  janeiro
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <ChevronDown className="w-3 h-3 text-gray-500" />
                <Checkbox
                  id="feb"
                  className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
                />
                <label htmlFor="feb" className="text-xs text-white/80">
                  feverei...
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <ChevronRight className="w-3 h-3 text-gray-500" />
                <Checkbox
                  id="mar"
                  className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
                />
                <label htmlFor="mar" className="text-xs text-white/80">
                  março
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <ChevronRight className="w-3 h-3 text-gray-500" />
                <Checkbox
                  id="apr"
                  className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
                />
                <label htmlFor="apr" className="text-xs text-white/80">
                  abril
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <ChevronDown className="w-3 h-3 text-gray-500" />
                <Checkbox
                  id="may"
                  className="w-3.5 h-3.5 border-white/50 rounded-[2px]"
                />
                <label htmlFor="may" className="text-xs text-white/80">
                  maio
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-white text-black text-xs px-2 py-1 mb-1 border border-gray-300 shadow-sm font-medium">
          nm_empresa
        </div>
        <div className="bg-white text-black text-xs flex flex-col border border-gray-300 shadow-sm">
          <div className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer transition-colors">
            FOCO ILUMINACAO
          </div>
          <div className="px-2 py-1.5 bg-gray-200 cursor-pointer font-medium border-l-2 border-[#3b82f6]">
            ISLIGHT
          </div>
          <div className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer transition-colors">
            LUCE NERA
          </div>
        </div>
      </div>
    </div>
  )
}

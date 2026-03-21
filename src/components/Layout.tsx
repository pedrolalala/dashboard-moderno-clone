import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export default function Layout() {
  return (
    <div className="h-screen flex flex-col bg-[#1e242b] text-white overflow-hidden font-sans">
      <Header />
      <main className="flex-1 min-h-0 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

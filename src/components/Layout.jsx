import { useNavigate } from "react-router-dom"

const Layout = ({ children }) => {
  const router = useNavigate()
  return (
    <section className="px-10">
      <header className="py-10 border-b border-b-blue-600 -mx-10">
        <nav className="px-20">
          <span className="text-4xl font-semibold text-cyan-400 cursor-pointer" onClick={() => router('/')} aria-hidden='true'>LS</span>
        </nav>
      </header>
      <main className="p-10 flex flex-col gap-6">
        {children}
      </main>
    </section>
  )
}

export default Layout
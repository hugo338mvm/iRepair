import { Link, Outlet } from 'react-router';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="bg-zinc-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-2">iRepair</h1>
        <nav className="flex gap-4 text-sm">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/clients" className="hover:underline">
            Clientes
          </Link>
          <Link to="/service-orders" className="hover:underline">
            Ordens de Serviço
          </Link>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};
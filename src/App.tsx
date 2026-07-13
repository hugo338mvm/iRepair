import { useState } from 'react';
import { Header } from './components/Header';
import { ServiceCard } from './components/ServiceCard';
import { NewServiceForm } from './components/NewServiceForm';
import type { OrdemServico } from './types/OrdemServico';

export function App() {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);

  return (
    <div className="min-h-screen bg-zinc-100">
      <Header />
      <main className="p-6">
        <h2 className="text-lg font-bold text-zinc-700 mb-4">
          Ordens de Serviço
        </h2>
        <NewServiceForm
          onAdicionar={(novaOrdem) => setOrdens([...ordens, novaOrdem])}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ordens.map((ordem) => (
            <ServiceCard key={ordem.id} ordem={ordem} />
          ))}
        </div>
      </main>
    </div>
  );
}
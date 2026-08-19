import { useEffect, useState } from 'react';
import { getAllClients, createClient, deleteClient } from '../services/clientService';
import type { Client } from '../types';

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getAllClients();
        setClients(data);
      } catch (e) {
        setError('Não foi possível carregar os clientes.');
      } finally {
        setIsLoading(false);
      }
    }

    loadClients();
  }, []);

  async function handleCreate() {
    if (!name || !phone || !email) {
      alert('Preencha todos os campos!');
      return;
    }

    const newClient = await createClient({ name, phone, email });
    setClients([...clients, newClient]);

    setName('');
    setPhone('');
    setEmail('');
  }

  async function handleDelete(id: number) {
    await deleteClient(id);
    setClients(clients.filter((client) => client.id !== id));
  }

  if (isLoading) return <p className="text-zinc-500">Carregando clientes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-bold text-zinc-700 mb-4">Clientes</h2>

      <div className="bg-white border border-zinc-200 rounded-lg p-4 mb-6 shadow-sm">
        <h3 className="font-bold text-zinc-700 mb-3">Novo Cliente</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-zinc-300 rounded-md px-3 py-2 flex-1"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-zinc-300 rounded-md px-3 py-2 flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-zinc-300 rounded-md px-3 py-2 flex-1"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="border border-zinc-200 bg-white p-4 rounded-lg shadow-sm"
          >
            <h3 className="font-bold text-zinc-800">{client.name}</h3>
            <p className="text-sm text-zinc-600">{client.phone}</p>
            <p className="text-sm text-zinc-600">{client.email}</p>
            <button
              onClick={() => handleDelete(client.id)}
              className="mt-2 text-xs text-red-600 hover:underline"
            >
              Excluir
            </button>          
          </div>
        ))}
      </div>
    </div>
  );
};
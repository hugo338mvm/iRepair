import { useEffect, useState } from 'react';
import {
  getAllServiceOrders,
  createServiceOrder,
  deleteServiceOrder,
} from '../services/serviceOrderService';
import { getAllClients } from '../services/clientService';
import type { Client, ServiceOrder, ServiceOrderStatus } from '../types';

export const ServiceOrdersPage = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [clientId, setClientId] = useState('');
  const [device, setDevice] = useState('');
  const [issue, setIssue] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [ordersData, clientsData] = await Promise.all([
          getAllServiceOrders(),
          getAllClients(),
        ]);
        setOrders(ordersData);
        setClients(clientsData);
      } catch (e) {
        setError('Não foi possível carregar as ordens de serviço.');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleCreate() {
    if (!clientId || !device || !issue) {
      alert('Preencha todos os campos!');
      return;
    }

    const newOrder = await createServiceOrder({
      clientId: Number(clientId),
      device,
      issue,
    });
    setOrders([...orders, newOrder]);

    setClientId('');
    setDevice('');
    setIssue('');
  }

  async function handleDelete(id: number) {
  await deleteServiceOrder(id);
  setOrders(orders.filter((order) => order.id !== id));
  }

  function getClientName(clientIdValue: number) {
    const client = clients.find((c) => c.id === clientIdValue);
    return client ? client.name : 'Cliente não encontrado';
  }

  function statusLabel(status: ServiceOrderStatus) {
    if (status === 'open') return 'Aberto';
    if (status === 'in_progress') return 'Em Andamento';
    return 'Finalizado';
  }

  function statusClasses(status: ServiceOrderStatus) {
    if (status === 'open') return 'bg-green-100 text-green-700';
    if (status === 'in_progress') return 'bg-yellow-100 text-yellow-700';
    return 'bg-zinc-200 text-zinc-600';
  }

  if (isLoading) return <p className="text-zinc-500">Carregando ordens de serviço...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-bold text-zinc-700 mb-4">Ordens de Serviço</h2>

      <div className="bg-white border border-zinc-200 rounded-lg p-4 mb-6 shadow-sm">
        <h3 className="font-bold text-zinc-700 mb-3">Nova Ordem de Serviço</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="border border-zinc-300 rounded-md px-3 py-2 flex-1"
          >
            <option value="">Selecione o cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Aparelho"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            className="border border-zinc-300 rounded-md px-3 py-2 flex-1"
          />
          <input
            type="text"
            placeholder="Defeito"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
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
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-zinc-200 bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-zinc-800">{order.device}</h3>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClasses(order.status)}`}
              >
                {statusLabel(order.status)}
              </span>
            </div>
            <p className="text-sm text-zinc-600">
              <span className="font-medium">Cliente:</span> {getClientName(order.client_id)}
            </p>
            <p className="text-sm text-zinc-600">
              <span className="font-medium">Defeito:</span> {order.issue}
            </p>
            <button
              onClick={() => handleDelete(order.id)}
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
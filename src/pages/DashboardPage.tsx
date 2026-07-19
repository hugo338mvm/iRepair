import { useEffect, useState } from 'react';
import { getAllServiceOrders } from '../services/serviceOrderService';
import { ServiceCard } from '../components/ServiceCard';
import type { ServiceOrder } from '../types';

export const DashboardPage = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getAllServiceOrders();
        setOrders(data);
      } catch (e) {
        setError('Não foi possível carregar as ordens de serviço.');
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (isLoading) return <p className="text-zinc-500">Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-bold text-zinc-700 mb-4">Ordens de Serviço</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <ServiceCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
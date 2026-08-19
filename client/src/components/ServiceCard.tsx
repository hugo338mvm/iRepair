import type { ServiceOrder } from '../types';

interface ServiceCardProps {
  order: ServiceOrder;
}

export const ServiceCard = ({ order }: ServiceCardProps) => {
  return (
    <div className="border border-zinc-200 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-zinc-800">{order.device}</h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            order.status === 'open'
              ? 'bg-green-100 text-green-700'
              : order.status === 'in_progress'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-zinc-200 text-zinc-600'
          }`}
        >
          {order.status === 'open' && 'Aberto'}
          {order.status === 'in_progress' && 'Em Andamento'}
          {order.status === 'done' && 'Finalizado'}
        </span>
      </div>
      <p className="text-sm text-zinc-600">
        <span className="font-medium">Defeito:</span> {order.issue}
      </p>
    </div>
  );
};
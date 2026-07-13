import type { OrdemServico } from '../types/OrdemServico';

interface ServiceCardProps {
  ordem: OrdemServico;
}

export function ServiceCard({ ordem }: ServiceCardProps) {
  return (
    <div className="border border-zinc-200 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-zinc-800">{ordem.cliente}</h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            ordem.status === 'aberto'
              ? 'bg-green-100 text-green-700'
              : ordem.status === 'em_andamento'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-zinc-200 text-zinc-600'
          }`}
        >
          {ordem.status === 'aberto' && 'Aberto'}
          {ordem.status === 'em_andamento' && 'Em Andamento'}
          {ordem.status === 'finalizado' && 'Finalizado'}
        </span>
      </div>
      <p className="text-sm text-zinc-600">
        <span className="font-medium">Aparelho:</span> {ordem.aparelho}
      </p>
      <p className="text-sm text-zinc-600">
        <span className="font-medium">Defeito:</span> {ordem.defeito}
      </p>
    </div>
  );
}
import { useState } from 'react';
import type { OrdemServico, StatusOS } from '../types/serviceOrder';

interface NewServiceFormProps {
  onAdicionar: (novaOrdem: OrdemServico) => void;
}

export function NewServiceForm({ onAdicionar }: NewServiceFormProps) {
  const [cliente, setCliente] = useState('');
  const [aparelho, setAparelho] = useState('');
  const [defeito, setDefeito] = useState('');
  const [status, setStatus] = useState<StatusOS>('aberto');

  function handleSalvar() {
    if (!cliente || !aparelho || !defeito) {
      alert('Preencha todos os campos!');
      return;
    }

    const novaOrdem: OrdemServico = {
      id: crypto.randomUUID(),
      cliente,
      aparelho,
      defeito,
      status,
    };

    onAdicionar(novaOrdem);

    setCliente('');
    setAparelho('');
    setDefeito('');
    setStatus('aberto');
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 mb-6 shadow-sm">
      <h2 className="font-bold text-zinc-700 mb-3">Nova Ordem de Serviço</h2>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Nome do cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="border border-zinc-300 rounded-md px-3 py-2 flex-1"
        />
        <input
          type="text"
          placeholder="Modelo do aparelho"
          value={aparelho}
          onChange={(e) => setAparelho(e.target.value)}
          className="border border-zinc-300 rounded-md px-3 py-2 flex-1"
        />
        <input
          type="text"
          placeholder="Defeito relatado"
          value={defeito}
          onChange={(e) => setDefeito(e.target.value)}
          className="border border-zinc-300 rounded-md px-3 py-2 flex-1"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusOS)}
          className="border border-zinc-300 rounded-md px-3 py-2"
        >
          <option value="aberto">Aberto</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="finalizado">Finalizado</option>
        </select>
        <button
          onClick={handleSalvar}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
import { Header } from './components/Header';

export const App = () => {
  return (
    <div className="min-h-screen bg-zinc-100">
      <Header />
      <main className="p-6">
        <h2 className="text-lg font-bold text-zinc-700 mb-4">
          Ordens de Serviço
        </h2>
        <p className="text-zinc-500 text-sm">
          Em breve: dados carregados da API via React Router.
        </p>
      </main>
    </div>
  );
};
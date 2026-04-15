import { Link } from 'react-router';

import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('notFound');

  return (
    <div className="px-6 md:px-12 py-40 text-center">
      <h2 className="text-white text-3xl font-semibold mb-4">404</h2>
      <p className="text-neutral-400 mb-2 text-[0.95rem]">Página não encontrada</p>
      <p className="text-neutral-500 mb-8 text-[0.85rem] max-w-md mx-auto leading-[1.7]">
        O endereço que você acessou não corresponde a nenhuma página deste portfólio.
      </p>
      <Link
        to="/"
        className="bg-white text-black rounded-full px-5 py-2 hover:bg-white/80 transition-colors text-[0.8rem]"
      >
        Voltar ao início
      </Link>
    </div>
  );
}

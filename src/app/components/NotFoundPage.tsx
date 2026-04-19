import { Link } from 'react-router';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button } from './ui/button';

export function NotFoundPage() {
  useDocumentTitle('notFound');

  return (
    <div className="px-6 md:px-12 py-40 text-center">
      <h2 className="text-shell-foreground text-3xl font-semibold mb-4">404</h2>
      <p className="text-shell-muted-foreground mb-2 text-[0.95rem]">Página não encontrada</p>
      <p className="text-shell-muted-foreground mb-8 text-[0.85rem] max-w-md mx-auto leading-[1.7]">
        O endereço que você acessou não corresponde a nenhuma página deste portfólio.
      </p>
      <Button asChild>
        <Link to="/">Voltar ao início</Link>
      </Button>
    </div>
  );
}

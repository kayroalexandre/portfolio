import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="px-6 md:px-12 py-40 text-center">
          <h2 className="text-shell-foreground text-3xl font-semibold mb-4">Algo deu errado</h2>
          <p className="text-shell-muted-foreground mb-2 text-[0.95rem]">
            Ocorreu um erro inesperado.
          </p>
          <p className="text-shell-muted-foreground mb-8 text-[0.85rem] max-w-md mx-auto leading-[1.7]">
            Tente recarregar a página. Se o problema persistir, entre em contato.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="border border-white/30 rounded-full px-5 py-2 text-white hover:bg-white hover:text-black transition-colors text-[0.8rem]"
            >
              Recarregar
            </button>
            <Link
              to="/"
              className="bg-white text-black rounded-full px-5 py-2 hover:bg-white/80 transition-colors text-[0.8rem]"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

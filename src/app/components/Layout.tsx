import { Outlet } from 'react-router';

import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollToTop } from './ScrollToTop';

export function Layout() {
  return (
    <div className="min-h-screen bg-shell-background text-shell-foreground font-sans">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

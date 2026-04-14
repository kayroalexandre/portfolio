import { Outlet } from 'react-router';

import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollToTop } from './ScrollToTop';

export function Layout() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

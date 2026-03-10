import { Outlet } from 'react-router';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-8">
        <Outlet />
      </main>
    </div>
  );
}
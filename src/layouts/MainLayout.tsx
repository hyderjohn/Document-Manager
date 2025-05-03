import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';

/**
 * Main Application Layout.
 *
 * Provides the standard authenticated user interface structure, including
 * the top Navbar, the left Sidebar (on medium screens and up),
 * and the main content area where routed pages are rendered via `<Outlet />`.
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:ml-64 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 
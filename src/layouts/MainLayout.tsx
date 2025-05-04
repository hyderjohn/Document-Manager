import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';

/**
 * Main Layout for Authenticated Users.
 *
 * Establishes the primary UI structure with a fixed top Navbar
 * and a fixed left Sidebar (on medium+ screens).
 * The main page content is rendered within the `<main>` element via `<Outlet />`.
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed navigation bar at the top */}
      <Navbar />
      <div className="flex">
        {/* Fixed sidebar navigation on the left (md+) */}
        <Sidebar />
        {/* Main content area - takes remaining space */}
        {/* Padding provides spacing, ml-64 offsets for the sidebar, mt-16 offsets for the navbar */}
        <main className="flex-1 p-4 sm:p-6 md:ml-64 mt-16">
          {/* Child route components render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 
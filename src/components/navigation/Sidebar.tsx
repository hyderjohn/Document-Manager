import { NavLink } from 'react-router-dom';
import { HomeIcon, DocumentDuplicateIcon, UsersIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";

/**
 * Defines the structure for a sidebar navigation item.
 */
interface NavigationItem {
  name: string; // Text label for the link
  href: string; // Target route path
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { title?: string; titleId?: string }>; // Icon component
  adminOnly?: boolean; // If true, only visible to admin users
}

/**
 * Sidebar navigation links configuration.
 */
const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
  { name: "Users", href: "/users", icon: UsersIcon, adminOnly: true }, // Only shown if user is admin
  { name: "Q&A", href: "/qa", icon: ChatBubbleLeftRightIcon },
  // Add other links like Settings here if needed
];

/**
 * Application Sidebar Navigation.
 *
 * Displays primary navigation links vertically on the left.
 * Visible on medium screens and up (md breakpoint).
 * Uses `useAuth` to determine user role for conditional link rendering (e.g., Users page).
 */
const Sidebar = () => {
  // Get user from the auth hook to check role
  const { loggedInUser: user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    // Fixed sidebar for medium screens and up
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* Optional: Add Logo/Title here if desired */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              // Hide admin-only links if user is not an admin
              if (item.adminOnly && !isAdmin) {
                return null; // Don't render this item
              }

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end // Add end prop for exact matching on dashboard/index route
                  className={({ isActive }) =>
                    // Dynamic classes for active vs inactive links
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      isActive
                        ? "bg-primary-100 text-primary-700 font-semibold" // Active styles
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // Inactive/hover styles
                    }`
                  }
                >
                  {/* Navigation Icon */}
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 transition-colors duration-150"
                    // Consider matching icon color to text color when active, potentially via `isActive`
                    aria-hidden="true"
                  />
                  {/* Navigation Text */}
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 
import { NavLink } from 'react-router-dom';
import { HomeIcon, DocumentDuplicateIcon, UsersIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";

/** Sidebar navigation item structure */
interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { title?: string; titleId?: string }>;
  adminOnly?: boolean;
}

/** Sidebar links config */
const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
  { name: "Users", href: "/users", icon: UsersIcon, adminOnly: true },
  { name: "Q&A", href: "/qa", icon: ChatBubbleLeftRightIcon },
];

/** Main sidebar navigation component */
const Sidebar = () => {
  const { loggedInUser: user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              if (item.adminOnly && !isAdmin) {
                return null;
              }
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      isActive
                        ? "bg-primary-100 text-primary-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 transition-colors duration-150"
                    aria-hidden="true"
                  />
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
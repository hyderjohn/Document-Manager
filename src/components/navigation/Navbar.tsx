import { Fragment } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";

/**
 * Navbar Component.
 *
 * Displays the main navigation bar at the top of the application within the MainLayout.
 * Includes the application title/logo and user profile actions (logout).
 *
 * TODO: Add other potential navbar items (e.g., notifications, settings link).
 */
const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /**
   * Handles the user logout action.
   * Dispatches the logout action, shows a toast notification,
   * and navigates the user to the login page.
   */
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm md:pl-64">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">DocManager</span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center">
              <Menu as="div" className="ml-3 relative">
                <Menu.Button className="flex items-center p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900 truncate">Signed in as</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <ArrowLeftOnRectangleIcon
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
import { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";

/** Top navigation bar component */
const Navbar = () => {
  const { loggedInUser: user, handleLogout } = useAuth();

  return (
    <nav className="bg-white shadow-sm md:pl-64 fixed top-0 left-0 right-0 z-20 h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">DocManager</span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center">
              <Menu as="div" className="ml-3 relative">
                <Menu.Button className="flex items-center p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                    <div className="py-1">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900 truncate">Signed in as</p>
                        <p className="text-sm text-gray-500 truncate" title={user.email}>
                          {user.email}
                        </p>
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
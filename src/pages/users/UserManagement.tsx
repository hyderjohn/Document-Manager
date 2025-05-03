import { useState } from 'react';
import {
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

/**
 * Interface representing a user account.
 */
interface User {
  /** Unique identifier for the user. */
  id: string;
  /** User's email address (acts as username). */
  email: string;
  /** User's role within the system. */
  role: 'admin' | 'user';
  /** Current status of the user account. */
  status: 'active' | 'inactive';
  /** ISO timestamp of the user's last login. */
  lastLogin: string;
}

// TODO: Replace mock data with actual API calls using react-query or Redux Toolkit Query.
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-02-20T10:00:00Z',
  },
  {
    id: '2',
    email: 'user@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-02-19T15:30:00Z',
  },
  {
    id: '3',
    email: 'inactive@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-02-18T09:15:00Z',
  },
];

/**
 * User Management Page.
 *
 * Displays a list of users and provides functionality to add, delete,
 * and manage user status. Currently uses mock data and simulated API calls.
 *
 * TODO:
 * - Implement actual API calls for user CRUD operations.
 * - Add user editing functionality (modal/form).
 * - Implement pagination and searching/filtering for the user list.
 * - Add role management capabilities.
 * - Improve error handling and loading states.
 */
const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isAddingUser, setIsAddingUser] = useState(false);

  /**
   * Simulates adding a new user.
   * TODO: Replace with actual API call.
   */
  const handleAddUser = async () => {
    try {
      setIsAddingUser(true);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Date.now().toString(),
        email: `user${Date.now()}@example.com`,
        role: 'user',
        status: 'active',
        lastLogin: new Date().toISOString(),
      };

      setUsers((prev) => [...prev, newUser]);
      toast.success('User added successfully');
    } catch (error) {
      toast.error('Failed to add user');
    } finally {
      setIsAddingUser(false);
    }
  };

  /**
   * Simulates deleting a user.
   * TODO: Replace with actual API call.
   * @param {string} id - The ID of the user to delete.
   */
  const handleDeleteUser = async (id: string) => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  /**
   * Simulates toggling the active/inactive status of a user.
   * TODO: Replace with actual API call.
   * @param {string} id - The ID of the user whose status to toggle.
   */
  const handleToggleStatus = async (id: string) => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                status: user.status === 'active' ? 'inactive' : 'active',
              }
            : user
        )
      );
      toast.success('User status updated successfully');
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">Manage user accounts and permissions.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button onClick={handleAddUser} disabled={isAddingUser} className="btn btn-primary flex items-center">
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Login
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="font-medium text-gray-900">{user.email}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement; 
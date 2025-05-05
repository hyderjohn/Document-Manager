import { useState } from 'react';
import { UserPlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

/** Structure for user account data */
interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  lastLogin: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-02-20T10:00:00Z",
  },
  {
    id: "2",
    email: "user@example.com",
    role: "user",
    status: "active",
    lastLogin: "2024-02-19T15:30:00Z",
  },
  {
    id: "3",
    email: "inactive@example.com",
    role: "user",
    status: "inactive",
    lastLogin: "2024-02-18T09:15:00Z",
  },
];

/** User Management Page (Admin) */
const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isAddingUser, setIsAddingUser] = useState(false);

  /** Mock add user handler */
  const handleAddUser = async () => {
    setIsAddingUser(true);
    const addToast = toast.loading("Adding user...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newUser: User = {
        id: `mock-${Date.now()}`,
        email: `newuser${Date.now().toString().slice(-4)}@example.com`,
        role: "user",
        status: "active",
        lastLogin: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, newUser]);
      toast.dismiss(addToast);
      toast.success("User added successfully");
    } catch (error) {
      console.error("Add user error:", error);
      toast.dismiss(addToast);
      toast.error("Failed to add user");
    } finally {
      setIsAddingUser(false);
    }
  };

  /** Mock delete user handler */
  const handleDeleteUser = async (id: string) => {
    const originalUsers = users;
    setUsers((prev) => prev.filter((user) => user.id !== id));
    const deleteToast = toast.loading("Deleting user...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.dismiss(deleteToast);
      toast.success("User deleted");
    } catch (error) {
      console.error("Delete user error:", error);
      toast.dismiss(deleteToast);
      toast.error("Failed to delete user");
      setUsers(originalUsers);
    }
  };

  /** Mock toggle user status handler */
  const handleToggleStatus = async (id: string) => {
    const currentStatus = users.find((u) => u.id === id)?.status;
    const action = currentStatus === "active" ? "Deactivating" : "Activating";
    const statusToast = toast.loading(`${action} user...`);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
        )
      );
      toast.dismiss(statusToast);
      toast.success("User status updated");
    } catch (error) {
      console.error("Toggle status error:", error);
      toast.dismiss(statusToast);
      toast.error("Failed to update user status");
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
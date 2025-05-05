import { ChartBarIcon, DocumentDuplicateIcon, UsersIcon } from "@heroicons/react/24/outline";

/** Main application dashboard page */
const Dashboard = () => {
  // Placeholder data
  const totalDocuments = 1234;
  const activeUsers = 56;
  const processingQueue = 7;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DocumentDuplicateIcon className="h-8 w-8 text-primary-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Documents</p>
              <p className="text-2xl font-semibold text-gray-800">{totalDocuments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-800">{activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-yellow-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Processing Queue</p>
              <p className="text-2xl font-semibold text-gray-800">{processingQueue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md h-64">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <p className="text-gray-500">Placeholder for recent activity feed...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md h-64">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Document Status Overview</h2>
          <p className="text-gray-500">Placeholder for a chart...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

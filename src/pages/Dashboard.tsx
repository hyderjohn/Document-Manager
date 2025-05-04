import { ChartBarIcon, DocumentDuplicateIcon, UsersIcon } from "@heroicons/react/24/outline";

/**
 * Main Dashboard Page.
 *
 * Shows an overview of important application metrics and activity.
 * Note: Currently uses static placeholder values.
 *
 * Future Work:
 * - Fetch real data for metric cards (documents, users, queue).
 * - Implement the "Recent Activity" component.
 * - Implement the "Document Status Overview" chart.
 * - Consider linking cards to respective management pages.
 */
const Dashboard = () => {
  // Placeholder data - replace with actual data fetching (e.g., react-query)
  const totalDocuments = 1234;
  const activeUsers = 56;
  const processingQueue = 7;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Top row: Key metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card: Total Documents */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DocumentDuplicateIcon className="h-8 w-8 text-primary-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Documents</p>
              <p className="text-2xl font-semibold text-gray-800">{totalDocuments}</p>
            </div>
          </div>
        </div>
        {/* Card: Active Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-800">{activeUsers}</p>
            </div>
          </div>
        </div>
        {/* Card: Processing Queue */}
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

      {/* Bottom row: Activity and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section: Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md h-64">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          {/* TODO: Insert activity feed component here */}
          <p className="text-gray-500">Placeholder for recent activity feed...</p>
        </div>
        {/* Section: Document Status Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md h-64">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Document Status Overview</h2>
          {/* TODO: Insert chart component here */}
          <p className="text-gray-500">Placeholder for a chart...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

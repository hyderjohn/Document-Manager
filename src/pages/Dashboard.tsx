import { ChartBarIcon, DocumentDuplicateIcon, UsersIcon } from "@heroicons/react/24/outline";

/**
 * Dashboard Page Component.
 *
 * Displays a summary of key metrics and recent activity.
 * Currently shows static placeholder data.
 *
 * TODO:
 * - Fetch actual data for dashboard metrics (total documents, users, queue) using react-query or RTK Query.
 * - Implement the "Recent Activity" feed.
 * - Implement the "Document Status Overview" chart (e.g., using Chart.js or a similar library).
 * - Potentially add links from the metric cards to relevant management pages.
 */
const Dashboard = () => {
  // TODO: Replace these with fetched data
  const totalDocuments = 1234;
  const activeUsers = 56;
  const processingQueue = 7;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Documents Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DocumentDuplicateIcon className="h-8 w-8 text-primary-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Documents</p>
              <p className="text-2xl font-semibold text-gray-800">{totalDocuments}</p>
            </div>
          </div>
        </div>
        {/* Active Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-800">{activeUsers}</p>
            </div>
          </div>
        </div>
        {/* Processing Queue Card */}
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

      {/* Additional Dashboard Sections (Activity, Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-md h-64">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          {/* TODO: Implement activity feed component */}
          <p className="text-gray-500">Placeholder for recent activity feed...</p>
        </div>
        {/* Document Status Overview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md h-64">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Document Status Overview</h2>
          {/* TODO: Implement chart component */}
          <p className="text-gray-500">Placeholder for a chart...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import react from "react";
const Reports = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Reports</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Revenue
        </h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Client Growth
        </h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder</p>
        </div>
      </div>
    </div>
  </div>
);
export default Reports;

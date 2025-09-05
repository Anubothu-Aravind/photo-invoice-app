import react from "react";

const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text ml-50 mb-6">
      Welcome to the Photo Invoice App
    </h1>
    
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Total Revenue
        </h3>
        <p className="text-3xl font-bold text-green-600">$12,345</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Active Clients
        </h3>
        <p className="text-3xl font-bold text-blue-600">24</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Pending Invoices
        </h3>
        <p className="text-3xl font-bold text-orange-600">8</p>
      </div>
    </div>
  </div>
);
export default Dashboard;
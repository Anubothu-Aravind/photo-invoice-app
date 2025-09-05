import react from "react";

const CreateInvoice = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Invoice</h1>
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"></textarea>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Create Invoice
        </button>
      </form>
    </div>
  </div>
);

export default CreateInvoice;

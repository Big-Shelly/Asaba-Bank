export default function Mortgage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary-600 mb-8">Mortgage Services</h1>
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Mortgage Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Value
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter property value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Down Payment
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter down payment"
              />
            </div>
          </div>
          <button className="mt-6 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">
            Calculate
          </button>
        </div>
      </div>
    </div>
  )
}

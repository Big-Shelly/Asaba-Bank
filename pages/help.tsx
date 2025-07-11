export default function Help() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary-600 mb-8">Help Center</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <div className="space-y-4">
              <p>Email: support@asababank.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Hours: 24/7</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">How do I reset my password?</h3>
                <p className="text-gray-600">Visit our password reset page...</p>
              </div>
              <div>
                <h3 className="font-medium">What are your banking hours?</h3>
                <p className="text-gray-600">We're available 24/7 online...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

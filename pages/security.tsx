export default function Security() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary-600 mb-8">Security</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Security Measures</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>2-Factor Authentication</li>
              <li>Encryption</li>
              <li>Secure Login</li>
              <li>Transaction Monitoring</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Use strong passwords</li>
              <li>Enable 2FA</li>
              <li>Monitor accounts</li>
              <li>Report suspicious activity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

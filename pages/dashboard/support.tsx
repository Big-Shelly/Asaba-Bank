import DashboardNavbar from '@/components/dashboard/Navbar';

export default function SupportPage() {
  return (
    <>
      <DashboardNavbar showHome />
      <main className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-indigo-800 mb-4">Support</h1>
        <p>
          If you need assistance, please contact us at{' '}
          <strong>support@asabank.com</strong> or call our 24/7 hotline at{' '}
          <strong>+1 800 123 4567</strong>.
        </p>
      </main>
    </>
  );
}

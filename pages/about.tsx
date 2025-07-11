import Logo from '@/components/ui/Logo';
import Navbar from '@/components/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Logo />
            <p className="text-xl text-gray-600 mt-2">
              Your trusted partner in financial excellence since 2009
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-6">
                <p className="text-gray-600">
                  Founded in 2009, Asaba National Bank has grown from a visionary idea into one of
                  New York's most respected financial institutions. Headquartered in the heart of
                  Manhattan's financial district, our bank combines the personal touch of a local
                  institution with the resources and expertise of a major banking organization.
                </p>
                <p className="text-gray-600">
                  What sets us apart is our unwavering commitment to our customers. We believe in
                  building long-term relationships based on trust, transparency, and exceptional service.
                  Our team of experienced professionals is dedicated to helping you achieve your
                  financial goals, whether you're managing personal finances or growing your business.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Financial Strength</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Savings Excellence</h3>
                  <p className="text-gray-600">
                    Our BigTree Savings account offers competitive interest rates and unmatched flexibility.
                    With no minimum balance requirements and easy access to your funds, you can grow
                    your savings while maintaining financial flexibility.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Early Direct Deposit</h3>
                  <p className="text-gray-600">
                    Get paid up to 2 days early with our early direct deposit service. We understand
                    that timing is crucial, which is why we prioritize getting your money to you
                    as quickly as possible.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Competitive Edge</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Industry-Leading Rates</h3>
                  <p className="text-gray-600">
                    We consistently offer some of the most competitive rates in the industry for both
                    savings and loans. Our transparent pricing and no-hidden-fees policy ensure
                    you always get the best value.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Experienced Leadership</h3>
                  <p className="text-gray-600">
                    Led by industry veterans with decades of experience, our leadership team brings
                    unparalleled expertise to every decision. Their vision and guidance ensure we
                    remain at the forefront of banking innovation while maintaining our commitment
                    to traditional values.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold text-primary-600 mb-4">"Grow Your Future with Confidence"</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our motto reflects our commitment to helping you build a secure financial future.
                Whether you're saving for retirement, investing in your business, or planning for
                your children's education, we're here to guide you every step of the way.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-2">Security First</h3>
                  <p className="text-gray-600">
                    Your financial security is our top priority. We use state-of-the-art encryption
                    and security protocols to protect your assets.
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-2">Personal Growth</h3>
                  <p className="text-gray-600">
                    We help you grow your wealth through smart investments and personalized financial
                    planning.
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-2">Community Prosperity</h3>
                  <p className="text-gray-600">
                    By choosing Asaba National Bank, you're supporting local growth and prosperity.
                    We're committed to making a positive impact in our community.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To empower individuals and businesses with innovative financial solutions that
                  foster growth, security, and prosperity. We strive to be more than just a bank -
                  we aim to be your trusted financial partner for life.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Integrity in every transaction</li>
                  <li>Customer-first service</li>
                  <li>Innovation in banking solutions</li>
                  <li>Community commitment</li>
                  <li>Sustainable growth</li>
                </ul>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Asaba National Bank?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Personalized Service</h3>
                  <p className="text-gray-600">
                    Our dedicated team provides customized solutions tailored to your unique needs.
                    From one-on-one consultations to personalized financial planning, we're committed
                    to understanding and meeting your specific requirements.
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Cutting-Edge Technology</h3>
                  <p className="text-gray-600">
                    Experience seamless banking with our state-of-the-art digital platforms. Our
                    mobile app and online banking portal offer 24/7 access to your accounts, advanced
                    security features, and innovative financial tools.
                  </p>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Financial Expertise</h3>
                  <p className="text-gray-600">
                    Trust in our team of experienced professionals to guide your financial journey.
                    With decades of combined experience in banking and finance, our experts provide
                    knowledgeable advice and strategic guidance to help you achieve your goals.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our New York Legacy</h2>
              <div className="space-y-6">
                <p className="text-gray-600">
                  Situated in the heart of New York City's financial district, Asaba National Bank
                  has been a cornerstone of the local community since 2009. Our flagship office,
                  located at 1 Wall Street, stands as a testament to our commitment to excellence
                  and our deep roots in the city.
                </p>
                <p className="text-gray-600">
                  We're proud to support local businesses, community initiatives, and economic growth
                  in New York. Our team actively participates in local events, charity programs,
                  and educational partnerships, demonstrating our dedication to making a positive
                  impact in the community.
                </p>
                <p className="text-gray-600">
                  Our New York headquarters provides our customers with access to world-class
                  financial services while maintaining a personal touch. We understand the unique
                  needs of New York's diverse business community and tailor our solutions
                  accordingly.
                </p>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Community Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Local Commitment</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Active participation in local business associations</li>
                    <li>Support for small business development</li>
                    <li>Financial literacy programs in schools</li>
                    <li>Partnerships with community organizations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Sustainability</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Green banking initiatives</li>
                    <li>Carbon-neutral operations</li>
                    <li>Community renewable energy projects</li>
                    <li>Environmental stewardship programs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/contact"
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors mb-4"
              >
                Contact Us
              </a>
              <p className="text-gray-500 text-sm">
                Ready to experience banking excellence? Our team is here to help you achieve your
                financial goals.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

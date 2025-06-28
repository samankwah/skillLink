import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const Imprint = () => {
  useDocumentTitle('Imprint - SkillLink')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Imprint
          </h1>
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Company Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Company Name:</strong> SkillLink Ghana Limited
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Registration Number:</strong> C-SL240001234
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>TIN:</strong> P0000123456789
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Registered Office:</strong><br/>
                  SkillLink House<br/>
                  Digital Valley, East Legon<br/>
                  Accra, Ghana<br/>
                  P.O. Box 12345<br/>
                  Greater Accra Region
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">General Inquiries</h3>
                  <p className="text-gray-700">
                    <strong>Email:</strong> info@skilllink.com.gh<br/>
                    <strong>Phone:</strong> +233 (0) 30 123 4567<br/>
                    <strong>Hours:</strong> Mon-Fri, 8:00 AM - 5:00 PM GMT
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Technical Support</h3>
                  <p className="text-gray-700">
                    <strong>Email:</strong> support@skilllink.com.gh<br/>
                    <strong>Phone:</strong> +233 (0) 30 123 4568<br/>
                    <strong>Hours:</strong> Mon-Sun, 6:00 AM - 10:00 PM GMT
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Management
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">Chief Executive Officer</h3>
                  <p className="text-gray-700">Dr. Nana Akoto, MBA</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">Chief Technology Officer</h3>
                  <p className="text-gray-700">Kwabena Boahen, MSc Computer Science</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">Chief Academic Officer</h3>
                  <p className="text-gray-700">Dr. Efua Adjei, PhD Education Technology</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Regulatory Information
              </h2>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Educational Accreditation</h3>
                <p className="text-gray-700 mb-4">
                  SkillLink is accredited by the Ghana Tertiary Education Commission (GTEC) 
                  and is a member of the Ghana Association of Private Higher Education (GAPHE).
                </p>
                
                <h3 className="text-lg font-medium text-gray-900 mb-3">Data Protection</h3>
                <p className="text-gray-700 mb-4">
                  We are registered with the Data Protection Commission of Ghana under 
                  registration number DPC-SL-2024-001.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mb-3">Professional Standards</h3>
                <p className="text-gray-700">
                  Our platform adheres to international educational standards including 
                  SCORM, xAPI (Tin Can API), and QTI compliance.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Dispute Resolution
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In case of disputes, we are committed to resolving issues through:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Direct communication with our customer service team</li>
                <li>Mediation through the Centre for Effective Dispute Resolution (CEDR)</li>
                <li>Jurisdiction of English and Welsh courts for legal matters</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Website Technical Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Technical Responsibility</h3>
                  <p className="text-gray-700">
                    <strong>Web Development:</strong> FutureDev Technologies<br/>
                    <strong>Email:</strong> web@futuredev.com<br/>
                    <strong>Hosting:</strong> AWS Europe (London)
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Content Management</h3>
                  <p className="text-gray-700">
                    <strong>Content Editor:</strong> SkillLink Editorial Team<br/>
                    <strong>Email:</strong> content@skilllink.com<br/>
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Copyright Notice
              </h2>
              <p className="text-gray-700 leading-relaxed">
                © {new Date().getFullYear()} SkillLink Education Platform Ltd. All rights reserved. 
                The content, design, and structure of this website are protected by copyright and other 
                intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Imprint
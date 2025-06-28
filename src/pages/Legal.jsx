import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const Legal = () => {
  useDocumentTitle('Legal Information - SkillLink')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Legal Information
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Terms of Service
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using SkillLink, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
              </p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">User Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the platform only for lawful educational purposes</li>
                <li>Respect intellectual property rights of content creators</li>
                <li>Follow community guidelines and code of conduct</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Intellectual Property Rights
              </h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Platform Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on SkillLink, including but not limited to courses, videos, text, graphics, logos, and software, is the property of SkillLink or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">User-Generated Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By submitting content to SkillLink, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and distribute your content for educational purposes on our platform.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Copyright Infringement</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We respect intellectual property rights and respond to clear notices of alleged copyright infringement. If you believe your work has been copied in a way that constitutes copyright infringement, please contact us at legal@skilllink.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Limitation of Liability
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Important:</strong> SkillLink shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the platform.
                </p>
              </div>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Service Availability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive to maintain continuous service availability, we do not guarantee that the platform will be uninterrupted, secure, or error-free. We reserve the right to modify or discontinue services with reasonable notice.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Educational Outcomes</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We provide educational content and tools but cannot guarantee specific learning outcomes, job placements, or career advancement. Success depends on individual effort, engagement, and external factors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Payment Terms and Refunds
              </h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Payment Processing</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All payments are processed securely through our trusted payment partners. We accept major credit cards, PayPal, and other approved payment methods.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Refund Policy</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>30-day money-back guarantee for new course purchases</li>
                <li>Refunds must be requested within 30 days of purchase</li>
                <li>Completed courses (>90% progress) are not eligible for refunds</li>
                <li>Subscription cancellations take effect at the end of the billing period</li>
                <li>Partial refunds may be considered on a case-by-case basis</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Account Termination
              </h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">User-Initiated Termination</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may close your account at any time by contacting our support team. Upon account closure, you will lose access to all courses and progress data.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Platform-Initiated Termination</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to suspend or terminate accounts that violate our terms of service, engage in fraudulent activity, or misuse the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These terms are governed by the laws of Ghana. Any disputes arising from or relating to these terms or your use of SkillLink shall be subject to the exclusive jurisdiction of the courts of Ghana.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Alternative Dispute Resolution</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Before pursuing formal legal action, we encourage users to contact our support team to resolve disputes amicably. We also offer mediation services through qualified third-party providers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Accessibility and Compliance
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                SkillLink is committed to providing an accessible learning environment for all users. Our platform complies with:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                <li>Americans with Disabilities Act (ADA) requirements</li>
                <li>European Accessibility Act standards</li>
                <li>General Data Protection Regulation (GDPR)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Contact Information for Legal Matters
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Legal Department</h3>
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@skilllink.com.gh<br/>
                  <strong>Phone:</strong> +233 (0) 30 123 4567<br/>
                  <strong>Address:</strong><br/>
                  SkillLink Legal Department<br/>
                  Digital Valley, East Legon<br/>
                  Accra, Ghana<br/>
                  P.O. Box 12345<br/>
                  Greater Accra Region
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Changes to Legal Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these legal terms at any time. Significant changes will be communicated to users via email and prominently displayed on our platform. Continued use of SkillLink after changes constitute acceptance of the new terms.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Stay Informed:</strong> We recommend reviewing this page periodically to stay informed about our legal terms and any updates.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Legal
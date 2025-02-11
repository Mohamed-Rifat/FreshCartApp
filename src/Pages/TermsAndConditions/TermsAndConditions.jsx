import React from 'react';
import './TermsAndConditions.css';
import { Helmet } from 'react-helmet';
export default function TermsAndConditions() {
  return (
  <>
  <Helmet>
    <title>Terms And Conditions</title>
  </Helmet>
    <section className="p-6 terms-container">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center">Terms and Conditions</h1>
        <div className="space-y-4 text-gray-700">
          <p><strong>Last Updated:</strong> 5/2/2025 </p>

          <h2 className="text-xl font-semibold">1. Definitions</h2>
          <p>
            <strong>"Service"</strong> refers to the Fresh Cart website, mobile application, and any related services.
          </p>
          <p>
            <strong>"User"</strong> refers to anyone who accesses or uses the Service.
          </p>
          <p>
            <strong>"Content"</strong> includes text, images, videos, product listings, reviews, and any other materials available on the Service.
          </p>

          <h2 className="text-xl font-semibold">2. Use of the Service</h2>
          <p>
            You must be at least <strong>18 years old</strong> to use Fresh Cart. By using the Service, you confirm that you meet this requirement.
          </p>
          <p>
            To access certain features, you must create an account. You agree to provide accurate and complete information during registration.
          </p>

          <h2 className="text-xl font-semibold">3. Intellectual Property</h2>
          <p>
            All content, trademarks, logos, and software on Fresh Cart are the property of Fresh Cart or its licensors.
          </p>

          <h2 className="text-xl font-semibold">4. Privacy</h2>
          <p>
            Your use of Fresh Cart is also governed by our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>

          <h2 className="text-xl font-semibold">5. Orders and Payments</h2>
          <p>
            Fresh Cart provides a platform for users to browse and purchase products. We do not guarantee the accuracy, quality, or availability of any products listed on the Service.
          </p>

          <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
          <p>
            Fresh Cart shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the Service.
          </p>

          <h2 className="text-xl font-semibold">7. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to the Service at any time, without notice, for any reason.
          </p>

          <h2 className="text-xl font-semibold">8. Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. Any changes will be posted on this page.
          </p>

          <h2 className="text-xl font-semibold">9. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of Egypt.
          </p>

          <h2 className="text-xl font-semibold">10. Contact Us</h2>
          <p>
            If you have any questions, please contact us at:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Email:</strong> support@freshcart.com</li>
            <li><strong>Phone:</strong> +1 234 567 890</li>
            <li><strong>Address:</strong> 123 Fresh Cart Street, City, Country</li>
          </ul>

          <h2 className="text-xl font-semibold">11. Acceptance</h2>
          <p>
            By using Fresh Cart, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
          </p>
        </div>
      </div>
    </section>
  </>
  );
}
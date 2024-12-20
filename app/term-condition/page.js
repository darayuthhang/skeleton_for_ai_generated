import React from 'react';
import Link from 'next/link';
import constants from '../lib/constants';
const TermCondition = ({
    companyName = constants.APP_NAME,
    websiteUrl = constants.DOMAIN_NAME
}) => {

    return (


        <div className="container mx-auto p-3" style={{
            fontFamily: "Arial, sans-serif"
        }}>
            <div className='text-xl p-3'>
                <Link className='btn btn-primary mb-4' href="/">Back</Link>
                <h1 className='fw-bold'>Terms and Conditions</h1>
                <p>Last updated: Dec 19 2024</p>

                <h2 className='mt-3 mb-3'>1. Introduction</h2>
                <p>Welcome to {companyName}. These Terms and Conditions govern your use of {websiteUrl} and its content and services.</p>

                <h2 className='mt-3 mb-3'>2. Acceptance of Terms</h2>
                <p>By accessing and using our website, you agree to comply with these Terms and Conditions set forth herein. If you do not agree to these terms, please do not use our site.</p>

                <h2 className='mt-3 mb-3'>3. Modification of Terms</h2>
                <p>We reserve the right to modify these Terms at any time. Your continued use of the website following such changes will constitute your acceptance of the new Terms.</p>

                <h2 className='mt-3 mb-3'>4. Use of the Website</h2>
                <p>You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit anyone else's use and enjoyment of the website.</p>

                <h2 className='mt-3 mb-3'>5. Intellectual Property</h2>
                <p>All content included on the website, such as text, graphics, logos, images, and software, is the property of {companyName} or its content suppliers.</p>

                <h2 className='mt-3 mb-3'>6. Disclaimer of Warranties</h2>
                <p>The website is provided "as is" without any representations or warranties, express or implied. {companyName} makes no representations or warranties in relation to the website or the information and materials provided on the website.</p>

                <h2 className='mt-3 mb-3'>7. Limitation of Liability</h2>
                <p>{companyName} will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special or consequential loss.</p>
                <h2 className='mt-3 mb-3'>8. Refunds</h2>
                <p>                For any reason, you can request a refund within 7 days of your purchase. If you are not satisfied with the product, then let us know and we will refund your purchase right away.
                </p>

                <h2 className='mt-3 mb-3'>9. Privacy Policy</h2>
                <p>Refer to our Privacy Policy for information on how we collect, use and disclose information from our users.</p>

                <h2 className='mt-3 mb-3'>10. Governing Law</h2>
                <p>These Terms will be governed by and interpreted in accordance with the laws of the Commonwealth of Massachusetts, without regard to its conflict of law principles. You submit to the non-exclusive jurisdiction of the state and federal courts located in Massachusetts for the resolution of any disputes.</p>

                <h2 className='mt-3 mb-3'>11. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at darayuthhang12@gmail.com</p>
            </div>
        
        </div>

    );
};

export default TermCondition;

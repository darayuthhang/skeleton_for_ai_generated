import React from 'react';
import Link from 'next/link';
import constants from '../lib/constants';
const PrivacyPolicy = ({ companyName = constants.APP_NAME}) => {
    return (
        <>
            
            <div className="container mx-auto p-4  ">

                <Link className='btn btn-primary mb-4' href="/">Back</Link>
                <h1 className="">Privacy Policy for {companyName}</h1>
                <p>Last updated: July 08 2024</p>

                <h2 className='mt-3 mb-3'>1. Introduction</h2>
                <p >Welcome to {companyName}. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share information about you when you visit our website. This policy is designed to comply with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).</p>

                <h2 className='mt-3 mb-3'>2. Information We Collect</h2>
                <p>We collect various types of information, including:</p>
                <ul>
                    <li><strong>Identity Data</strong>: Includes first name, last name, username, or similar identifier.</li>
                    <li><strong>Contact Data</strong>: Includes email address and telephone numbers.</li>
                    <li><strong>Technical Data</strong>: Includes IP address, login data, browser type and version, time zone setting, and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our website.</li>
                    <li><strong>Usage Data</strong>: Includes information about how you use our website and services.</li>
                </ul>

                <h2 className='mt-3 mb-3'>3. How We Use Your Data</h2>
                <p>We use your personal data in the following ways:</p>
                <ul>
                    <li>To provide and maintain our service.</li>
                    <li>To notify you about changes to our service.</li>
                    <li>To allow you to participate in interactive features when you choose to do so.</li>
                    <li>To provide customer support.</li>
                    <li>To gather analysis or valuable information so we can improve our service.</li>
                </ul>

                <h2 className='mt-3 mb-3'>4. Your Rights Under GDPR and CCPA</h2>
                <p>You have several rights under the GDPR and CCPA, including:</p>
                <ul>
                    <li><strong>Access:</strong> You have the right to request access to the personal data we hold about you.</li>
                    <li><strong>Rectification:</strong> You have the right to have any incorrect personal data corrected.</li>
                    <li><strong>Erasure:</strong> You have the right to request the deletion of your personal data.</li>
                    <li><strong>Restriction of Processing:</strong> You can ask us to suspend the processing of your personal data.</li>
                    <li><strong>Data Portability:</strong> You have the right to request a copy of your data in a machine-readable format.</li>
                    <li><strong>Object to Processing:</strong> You have the right to object to the processing of your personal data.</li>
                    <li><strong>Consent Withdrawal:</strong> Where we rely on consent, you have the right to withdraw this consent.</li>
                    <li><strong>CCPA Specific Rights:</strong> If you are a California resident, you have additional rights such as requesting information about the collection, use, and sharing of your personal data, and requesting the deletion of your personal data.</li>
                </ul>

                <h2 className='mt-3 mb-3'>5. Data Security</h2>
                <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, accessed in an unauthorized way, altered, or disclosed.</p>

                <h2 className='mt-3 mb-3'>6. Data Retention</h2>
                <p>We will retain your personal data only for as long as necessary for the purposes we collected it for, including to satisfy any legal, regulatory, tax, accounting, or reporting requirements.</p>

                <h2 className='mt-3 mb-3'>7. Sharing Your Data</h2>
                <p>We may share your data with third parties for various purposes, including:</p>
                <ul>
                    <li>Service Providers: To assist in providing our services.</li>
                    <li>Legal Obligations: When required by law or to protect our rights.</li>
                    <li>Business Transfers: In the context of a merger or acquisition.</li>
                </ul>

                <h2 className='mt-3 mb-3'>8. International Transfers</h2>
                <p>Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.</p>
        
                <h2 className='mt-3 mb-3'>9. Public Data Disclaimer for Free Search Users</h2>
                <p>By using our free search functionality, you acknowledge and agree that any data you submit will become publicly accessible. This includes, but is not limited to, search queries, keywords, and other information provided during the use of the free search feature.</p>
                <p>If you prefer to keep your data private, we recommend using our paid services, which offer enhanced privacy and data protection.</p>

                <h2 className='mt-3 mb-3'>9. Updates to This Policy</h2>
                <p>We may update this policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

                <h2 className='mt-3 mb-3'>10. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at darayuthhang12@gmail.com.</p>
            </div>
        </>
        
    );
};

export default PrivacyPolicy;

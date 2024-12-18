import { db } from "@/app/lib/db";
import { EmailServiceError } from "@/app/lib/error-handler/app-errors";
import { Resend } from "resend";
class EmailService {
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }
  async sendThroughEmail(emailTo, subject, text, fromEmail){
    
    try {
      let result = await this.resend.emails.send({
        from:`${fromEmail}`, // Ensure this domain has a good reputation and proper email authentication (SPF, DKIM, DMARC)
        to: `${emailTo}`,
        subject: `${subject}`, // Clear and simple subject line
        text: `${text}`,
     
      });
   
     return result
    } catch (error) {
    
      throw new EmailServiceError(error);
    }
  }
  async sendLogoThroughEmail(fromEmail, emailSendTo, zipBuffer){
    
    try {
      let result = await this.resend.emails.send({
        from:`${fromEmail}`, // Ensure this domain has a good reputation and proper email authentication (SPF, DKIM, DMARC)
        to: `${emailSendTo}`,
        subject: 'Here is your Logo!',
        text: 'Please find the attached ZIP file containing your Logo.',
        attachments: [
          {
            filename: 'logo.zip',
            content: zipBuffer.toString('base64'),
            type: 'application/zip',
            disposition: 'attachment',
          },
        ],
     
      });
   
     return result
    } catch (error) {
    
      throw new EmailServiceError(error);
    }
  }
  async sendInvoice(businessName, subject, text, receiverEmail, pdfBlob) {
    const invoiceBase64 = pdfBlob.toString("base64");

    // text -  download your invoices with this link.
    // subt - `Get an invoice for your purchase at ${businessName}`
    try {
      let result = await this.resend.emails.send({
        from: `${businessName} <no.reply@invoicesonic.com>`, // Ensure this domain has a good reputation and proper email authentication (SPF, DKIM, DMARC)
        to: receiverEmail,
        subject: ` ${subject} ${businessName}`, // Clear and simple subject line
        // html: `
        // <html>
        //     <head>
        //         <style>
        //             body { font-family: Arial, sans-serif; }
        //             .header { font-weight: bold; font-size: 24px; }
        //             .code { font-size: 22px; margin-top: 10px; }
        //             .footer { margin-top: 10px; font-size: 14px; }
        //         </style>
        //     </head>
        //     <body>
        //         <h1>${APP_NAME}</h1>
        //         <div class="header">Verification Code</div>
        //         <div class="code">${verificationCode}</div>
        //         <p class="footer">Here is your OTP verification code. It will expire in 6 minutes.</p>
        //     </body>
        //     </html>
        //     `,
        text: text,
        attachments: [
          {
            filename: "invoice.pdf",
            content: invoiceBase64,
          },
        ], // Include a plain text version of the email
      });
     return result
    } catch (error) {
      throw new EmailServiceError(error);
    }
  }
}
export default EmailService;

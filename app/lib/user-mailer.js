import constants from "./constants";
import path from 'path';
import nodemailer from 'nodemailer';

class UserMailer {
    getTransporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_GMAIL_USER,
                pass: process.env.NEXT_PUBLIC_GMAIL_SECRET_CODE
            },
        });
    }
    async getUserEmailInfo(fromText, text, email, subject, code, typeOfEmail) {
        let p = "<p>Here is your OTP verification code.</p>"
        let div = `<div style="font-weight:bold; font-size:35px">Verification code</div>`
        let htmlCode = `<div style="font-size:50px">${code}</div>`
        if (typeOfEmail === constants.RESET_PASS) {
            p = "<p>Here is your link</p>"
            div = `<div style="font-weight:bold; font-size:20px">${text}</div>`
            htmlCode = `<a href="${code}">${code}</a>`
        }
        let object = {
            from: fromText,
            to: email,
            subject: subject,
            text: text,
            html: `
                <html>
                <body>
                    <h1>CodeFixer</h1>
                    <img  style="width:50px" src="cid:taskkru-id" alt="Image">
                    ${div}
                    ${htmlCode}
                    ${p}
                    <p>It will expire in 6 minutes.</p>
                </body>
                </html>
            `,
            attachments: [
                {
                    filename: 'code-fixer-app-192.png',
                    path: path.join(`${process.cwd()}`,`/public/code-fixer-app-192.png`),
                    cid: 'taskkru-id', // Use this ID in the HTML img tag
                },
            ],
        }

        return object;

    }
    /**
     * @code cannot be link or verification code
     */
    async sendEmail(from, text, email, subject, code, typeOfEmail = '') {
        try {
            const transporter = this.getTransporter()
            let userEmailInfo = await this.getUserEmailInfo(from, text, email, subject, code, typeOfEmail)
            await transporter.sendMail(userEmailInfo);
            //return True if the mail send successfuly
            return true;
        } catch (error) {
            console.log(error, "email not sent");
        }
        //return null if email send unsuccessfuly
        return false;
    }
}
export default new UserMailer();

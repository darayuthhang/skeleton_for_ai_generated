class EmailHelpers {
    getEmailTemplate = (subUrl, unsubUrl = '', email) => {
        return {
            from: process.env.NEXT_PUBLIC_DOMAIN_EMAIL,
            to: email,
            subject: 'Important: confirm your subscription',
            html: `
            <div>
                <p>
                    Thanks for signing up. Click the link below to confirm your subscription, and you'll be on your way.
                </p>

                <a href=${subUrl}>
                    <button style="background-color: #007bff; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s;">
                        Please confirm your subscription
                    </button>
                </a>
                <p> We are glad to have you. </p>
                 <a href=${unsubUrl}>
                    Unsubscribe
                </a>
              <br>
              <br>
                   <img src="https://res.cloudinary.com/dacxiuqkp/image/upload/v1695152212/email-image_pozdze.png"  alt="Bridge of Dream">
            </div>
           `
        }
    }
}
export default new EmailHelpers();

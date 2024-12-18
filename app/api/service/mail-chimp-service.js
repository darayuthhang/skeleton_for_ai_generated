import mailchimp from '@mailchimp/mailchimp_marketing'
import { ApiError } from '@/app/lib/error-handler/app-errors';

import md5 from 'md5';
class MailChimpService {
    constructor(apikey, Server) {
        mailchimp.setConfig({
            apiKey: apikey,
            server: Server,
        });
        this._listId = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID
    }
    async ping() {
        return await mailchimp.ping.get();
    }
    async subscribeUser(email) {
        try {
            // Define the list ID to which you want to add subscribers


            // Define the subscriber's information (email address, status, etc.)
            const subscriber = {
                email_address: email,
                status:'subscribed', // You can use 'subscribed', 'unsubscribed', 'pending', or 'cleaned'
            };
            // Add the subscriber to the list
            const response = await mailchimp.lists.addListMember(this._listId, subscriber);
        } catch (error) {
            console.log(error);
            throw new ApiError(error, error?.status)
        }
    }
    async isUserWithSub(email) {
        try {
            const subscribedResponse = await mailchimp.lists.getListMember(this._listId, md5(email));
            if (subscribedResponse.status === 'subscribed') {
                return true;
            }
        } catch (error) {

            return false;
        }

    }
    async isUserWithUnSub(email) {
        try {
            const unsubscribedResponse = await mailchimp.lists.getListMember(this._listId, md5(email));
            if (unsubscribedResponse.status === 'unsubscribed') {
                return true;
            }
        } catch (error) {

            return false;
        }

    }
    async updateSub(email, sub) {
        try {
            const response = await mailchimp.lists.updateListMember(this._listId, email, {
                status: sub, // Change the status to 'sub' for subscribed
            });
        } catch (error) {
            throw new ApiError(error);
        }
    }

}

export default MailChimpService;

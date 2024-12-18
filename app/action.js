'use server'
import { Resend } from "resend";
import { db } from "./lib/db";
export async function addEmail  (prevStatem ,formData){
    "use server";
    // const audienceId = process.env.NEXT_PUBLIC_RESEND_AUDIENCE_ID;

    // const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
    const email = formData.get("email");
    if (email) {
      try {
        // Create a new record in the WaitList table
        const waitlistEntry = await db.WaitList.create({
          data: {
            email
          },
        });

        //resend handle duplicate for us.
        // let res = await resend.contacts.create({
        //   email: email,
        //   firstName: "Steve",
        //   lastName: "Wozniak",
        //   unsubscribed: false,
        //   audienceId: audienceId,
        // });
       
      } catch (error) {
        console.log(error);
      }
    }
    return {
        message: 'Add Successfully',
      }
    //await addEmailToResend(email);
  };
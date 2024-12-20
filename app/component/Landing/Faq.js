import React from 'react';
/**
 * 
 *      Generative AI costs money to run. We don't offer refunds, 
        but we happily offer you a credit so you can try again.
 */
const faqContent = [
    {
        faqQuestion:"How do credits work",
        content:`
        Each coloring page design requires 1 credit.
        `
    },
    {
        faqQuestion:"What do I get exactly?",
        content:`You will get coloring page that can be used for free commercially

        `
    },
    {
        faqQuestion: "Can i get refund?",
        content: `
        If you do not like it, let us know. We will refund you within 7 days of purchase. If you are kind enough, please give us feedback.
        `
    },
    {
        faqQuestion: "Is the payment safe?",
        content: `
            Our app utilizes Stripe, a secure and widely trusted 
            payment gateway that ensures the safety of 
            financial transactions.
        `
    },
    {
        faqQuestion: "How long does it take?",
        content: `
        Just 5 to 10 seconds
        `
    },
    {
        faqQuestion: "Where can i find customer supports?",
        content: `
        You send us an email to darayuthhang12@gmail, or click
        chat logo to chat with us. We will try to respond as soon as
        possible.
        `
    },
    {
        faqQuestion: "What is the format for the coloring page?",
        content: `
        You will be able to download format in png.
        `
    },
    // {
    //     faqQuestion: "Will my uploaded image look exactly the same every time?",
    //     content: `
    //             Using the same prompt may generate slightly different versions of your uploaded image each time. Save the versions you like!
                
    //             `
    // },
    // {
    //     faqQuestion: "Why does it so cheap?",
    //     content: `
    //         Solopreneur just want to make his first $ on internet.
    //     `
    // },
]
const Faq = () => {
    return (
        <section className='mt-4 mb-4 p-2 md:p-20   '>
            <div className='container mx-auto md:grid md:grid-cols-2'>
                <div className='flex justify-center mt-3 mb-3'>
                    <h2 className='text-3xl font-bold '>Frequently Asked Questions</h2>
                </div>
                <div>
                    {faqContent.map((val, index) =>
                        <div className="collapse collapse-arrow border-2  bg-originalColor mt-2 mb-2">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl text-black font-medium">
                                {`${val?.faqQuestion}`}
                            </div>
                            <div className="collapse-content">
                                <p className='text-black'>{val?.content}</p>
                            </div>
                        </div>
                        // <details className="collapse bg-base-200 mt-3 mb-3">
                        //     <summary className="collapse-title text-xl text-black font-medium">
                        //         <div className='flex'>
                        //             {`${val?.faqQuestion}`}
                        //         </div>
                              
                               
                        //     </summary>
                        //     <div className="collapse-content">
                        //         <p className='text-slate-400'>{val?.content}</p>
                        //     </div>
                        // </details>
                    )}
                </div>
            </div>
       </section>
    );
};

export default Faq;

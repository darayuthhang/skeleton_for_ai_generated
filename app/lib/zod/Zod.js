import * as z from 'zod';
class Zod{
    userSignUpSchema = z.object({
        name: z.string().min(1).max(255).trim(),
        // accountType: z.string().min(1).max(255).trim(),
        email: z.string().email({ message: 'Please enter a valid email address' }).min(1).email("invalid email"),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
            .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
                message: 'Password must contain at least one letter and one number',
            })
            .trim(),
    });
    userResentCodeSchema = z.object({
        email: z.string().email({ message: 'Please enter a valid email address' }).min(1).email("invalid email"),
    });
    userLoginSchema = z.object({
        // accountType: z.string().min(1).max(255).trim(),
        // signUpOrLogin: z.string().min(1).max(255).trim(),
        email: z.string().email({ message: 'Please enter a valid email address' }).min(1).email("invalid email"),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
            .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
                message: 'Password must contain at least one letter and one number',
            })
            .trim(),
    });
    userResetEmailSchema = z.object({
        email: z.string().email({ message: 'Please enter a valid email address' }).min(1).email("invalid email"),
    });

    emailSchema = z.object({
        email: z.string().email({ message: 'Please enter a valid email address' }).min(1).email("invalid email"),
    });
 
    stripeSchema = z.object({
        // isAlert: z.boolean({
        //     required_error: "isAlert is required",
        //     invalid_type_error: "isAlert must be a boolean",
        // }),
        amount: z.string().min(1, 'amount is required').max(255).trim(),
        accountType: z.string().min(1, 'accountType is required').max(255).trim()
    })

    appNameSchema = z.object({
        // isAlert: z.boolean({
        //     required_error: "isAlert is required",
        //     invalid_type_error: "isAlert must be a boolean",
        // }),
        appName: z.string().min(1, 'title is required').max(255).trim(),

    })

    productSchemaPrompt = z.object({
        // isAlert: z.boolean({
        //     required_error: "isAlert is required",
        //     invalid_type_error: "isAlert must be a boolean",
        // }),
        // emphasize:z.string().min(1, 'emphasize is not required').max(255).trim().optional(),
        prompt: z.string().min(1, 'prompt is required').max(255).trim(),
        selectedCountryCode:z.string().min(1, 'title is required').max(255).trim(),
       
    })
    invoiceSchema = z.object({
        amountDue: z.number(),
        invoiceNumber: z.string().min(1, 'invoiceNumber is required').max(255).trim(),
        billToRequired: z.string().min(1, 'BillTo is required').max(255).trim(),
        date_issue: z.string().min(1, 'date_issue is required').max(255).trim(),
        due_date:z.string().min(1, 'due_date is required').max(255).trim(),
        lineItems: z.array(z.object({
            description: z.string(),
            price: z.string().transform(value => parseFloat(value)),
            quantity:  z.string().transform(value => parseInt(value))
          })),
        subTotal: z.number(),
        taxRate:z.string().optional(),
        discountRate:z.string().optional(),
        totalAmount: z.number(),
        totalDiscount: z.number(),  // Assuming you want to keep it as string, otherwise convert to number
        totalTax: z.number(), // Assuming you want to keep it as string, otherwise convert to number
    })

    // invoiceUpdateSchema = z.object({
    //     due_date: z.string().datetime(),
    //     date_issue: z.string().datetime(),
    //     billToRequired: z.string().min(1, 'BillTo is required').max(255).trim(),
    //     invoiceNumber: z.string().min(1, 'Invoicenumber is required').max(255).trim(),
    //     discountRate: z.number(),
    //     subTotal: z.number(),
    //     taxRate: z.string().optional(),
    //     total: z.number(),
    //     amountDue: z.number(),
    //     // lineItems: z.array(z.object({
    //     //     description: z.string(),
    //     //     price: z.number(),
    //     //     quantity:  z.number()
          
    //     //   })),   
    // })
    sendInvoiceEmailSchema = z.object({
        email: z.string().min(1, 'title is required').max(255).trim(),

    })
    subSchema = z.object({
        subId: z.string().min(1, 'subId is required').max(255).trim(),

    })
    promptSchema = z.object({
        // promptToRequired: z.string().min(1, 'Prompts is required').max(255).trim(),
        style: z.string().min(1, 'style is required').max(255).trim(),
        color: z.string().min(1, 'color is required').max(255).trim(),
        bgColor: z.string().min(1, 'bgColor is required').max(255).trim(),
        threeDModal: z.string().min(1, 'threeDModal is required').max(255).trim(),
        popularCategory:z.string().min(1, 'popularCategory is required').max(255).trim(),
        promptToRequired:z.string().optional(),
        companyName: z.string().optional(),
        industry: z.string().min(1, 'industry is required').max(255).trim(),

    })

    feedBackSchema = z.object({
        // promptToRequired: z.string().min(1, 'Prompts is required').max(255).trim(),
        text: z.string().min(1, 'text is required').max(255).trim(),
       
    })

    downloadSchema = z.object({
        // promptToRequired: z.string().min(1, 'Prompts is required').max(255).trim(),
        imageUrl: z.string().min(1, 'text is required').max(255).trim(),
       
    })

    newPromptSchema = z.object({
        // promptToRequired: z.string().min(1, 'Prompts is required').max(255).trim(),
        prompt: z.string().min(1, 'prompt is required').max(255).trim(),
  
   

    })

    nameGeneratorSchema = z.object({
        // promptToRequired: z.string().min(1, 'Prompts is required').max(255).trim(),
        promptRequired: z.string().min(1, 'promptRequired is required').max(255).trim(),
       
    })
    youtubeGeneratorSchema = z.object({
        // promptToRequired: z.string().min(1, 'Prompts is required').max(255).trim(),
        promptRequired: z.string().min(1, 'promptRequired is required').max(255).trim(),
        variants: z.string().min(1, 'variants is required').max(255).trim(),
        toggle: z.boolean()

    })
    tikTokHastaggeneratorSchema = z.object({
        // promptToRequired: z.string().min(1, 'Prompts is required').max(255).trim(),
        promptRequired: z.string().min(1, 'promptRequired is required').max(255).trim(),
        tags: z.string().min(1, 'variants is required').max(255).trim(),

    })

    imageUrlSchema = z.object({
        // promptToRequired: z.string().min(1, 'Prompts is required').max(255).trim(),
        imageUrl: z.string().min(1, 'imageUrl is required').max(255).trim(),
       


    })

}
export default new Zod();

import { serve } from "inngest/next";
import {inngest} from './client';
import { create3dLogo } from "./function";
import { sendLogoThroughEmail } from "./emailFunction";
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    create3dLogo,
    sendLogoThroughEmail
    // uploadLogo
    /* your functions will be passed here later! */
  ],
});
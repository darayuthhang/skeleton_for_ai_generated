
'use server'
import { NextResponse } from 'next/server'

const allowedOrigins = [
    process.env.NEXT_PUBLIC_URL,
    "https://stripe.com/",
    "https://api.inngest.com/"

    // 'http://localhost:4242',

];
// if (remaining < 0) {
//     return NextResponse.json({ success: false }, { status: 429, error: "Too Many Request" });
// }
export async function middleware(request) {  // retrieve the current response
    console.log("middlware" + process.env.NEXT_PUBLIC_URL);
    // rate limit

    // console.log(remaining);
 
    // check authorization
    const res = NextResponse.next()

    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', allowedOrigins) // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    return res
}
// specify the path regex to apply the middleware to
export const config = {
    matcher: ['/api/:path*', '/dashboard/:path*'],
}




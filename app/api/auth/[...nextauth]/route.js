import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import BackEndPoint from '@/app/lib/BackEndPoint';
import jwt_decode from "jwt-decode";
import Auth from "./Auth";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "google-login-id",
            name: "google-credentials",
            credentials: {},
            async authorize(credentials) {
              try {
                  const endpoint = BackEndPoint.GOOGLE_USER;
                  const data = {
                      googleToken: credentials?.googleToken,
                      signUpOrLogin: credentials?.signUpOrLogin,
                      accountType:credentials?.accountType
                  }
                  return await Auth.sendPostRequest(endpoint, data);
              } catch (error) {
                throw new Error(error);
              }
            },
        }),
        CredentialsProvider({
            id: "custom-user-login-id",
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    const data = {
                        email: credentials?.email,
                        password: credentials?.password,
                        accountType: credentials?.accountType,
                        signUpOrLogin: credentials?.signUpOrLogin
                    }
                    const endpoint = BackEndPoint.USER_LOGIN;
                    return await Auth.sendPostRequest(endpoint, data);  
                } catch (error) {
                    throw new Error(error);
                }
               
            },
        }),
        CredentialsProvider({
            id: "custom-user-signup-id",
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    const data = {
                        email: credentials?.email,
                        verificationCode: credentials?.verificationCode
                    }
                    const endpoint = BackEndPoint.VERIFY_USER;
                    return await Auth.sendPostRequest(endpoint, data);
                } catch (error) {
                    throw new Error(error);
                }

            },
        }),
        // CredentialsProvider({
        //     id: "custom-user-sign-up-payment-id",
        //     name: "credentials",
        //     credentials: {},
        //     async authorize(credentials) {
        //         try {
        //             const data = {
        //                 email: credentials?.email,
        //                 password: credentials?.password,
        //                 accountType: credentials?.accountType
        //             }
        //             const endpoint = BackEndPoint.SIGN_UP;
        //             return await Auth.sendPostRequest(endpoint, data);
        //         } catch (error) {
        //             throw new Error(error);
        //         }

        //     },
        // }),
    ],
    callbacks: {
        async jwt ({token, user, session, trigger}){
     
            const accessToken = token?.user?.accessToken;
            const refreshToken = token?.user?.refreshToken;
            if(trigger === 'update'){token.user.statusCode = ''}
            // console.log(trigger);
            else if (refreshToken && accessToken){;
                //This is where refreshtoken will fetch accessToken.
                var decoded = jwt_decode(accessToken);
                const isToken = decoded?.exp * 1000 < Date.now()
                //if token expire.
                if (isToken) {
                    token.user.accessToken = await Auth.getAccessToken(BackEndPoint.AUTH_TOKEN, refreshToken);             
                }
            }
            if(user){return {...token,user}}
            return token;
        },  
        async session({ session, token, user }) {
            if (token?.user){
                let object = {
                    ...session,
                    accessToken: token?.user?.accessToken,
                    firstName: token?.user?.firstName,
                    lastName: token?.user?.lastName,
                    email: token?.user?.email,
                    refreshToken: token?.user?.refreshToken,
                }
                return object
            }
            return session
        }
      
    },
    events: {
        async signOut({ token, session }) {
        
            // Set token/session to {}, that would update the cilentside token/session as well
            token = {};
            session = {};
            // Delete auth cookie on signout so it doesn't persist past log out
         
        }
        
    },
    pages: {
        signIn: "/user/login",
    },
    
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

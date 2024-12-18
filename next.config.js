/** @type {import('next').NextConfig} */
const nextConfig = {
    // env: {

    //     NEXTAUTH_SECRET: 'mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=',
    // },
    // experimental: {
    //     serverActions: true,
    // },
  
    images: {
        // domains: [
        //     'avatars.steamstatic.com', 
        //     'unsplash.com', 
        //     'plus.unsplash.com',
        //     'images.unsplash.com',
        //     'oaidalleapiprodscus.blob.core.windows.net',
        //     'upcdn.io'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'coloring-page.s3.amazonaws.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '**', // This allows any hostname
                pathname: '**', // This allows any pathname
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '3dlogoai.s3.amazonaws.com',
                pathname: '**',
            },
          
          
          
        ],

    },
    reactStrictMode: false,
    // async rewrites() {
    //     return [
    //       {
    //         source: '/api/:path*',
    //         destination: '/api/:path*'
    //       },
    //       {
    //         source: '/:path*',
    //         destination: '/'
    //       }
    //     ];
    //   }
}

module.exports = nextConfig

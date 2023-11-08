/** @type {import('next').NextConfig} */

const nextConfig = {
   middleware: [
        {
             name: 'redirect',
             options: {
                statusCode: 404,
                source: '/:path*',
                destination: 'https://www.google.com',
             },
        },
     ],

}

module.exports = nextConfig

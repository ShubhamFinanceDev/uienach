/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {

         BASE_URL:"https://ENACH2.shubham.co:8080"
    },

    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                '127.0.0.1:5500',
                '144.24.96.140',
                '*',
            ]
        }
    },
}

module.exports = nextConfig
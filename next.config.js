/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: "http://144.24.96.140:8080"
        // BASE_URL: "http://192.168.5.208:8080"
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
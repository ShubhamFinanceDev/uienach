/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: "http://localhost:8080/eNach"
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
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'firebasestorage.googleapis.com',
            '1n3.googleusercontent.com',
            'm.media-amazon.com'            
        ],
    }
}

module.exports = nextConfig;

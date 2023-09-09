/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "res.cloudinary.com",
            "images.unsplash.com",
        ],
    },
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        SERVER_URL: process.env.SERVER_URL,
    },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },

    webpack(config, { isServer }) {
        // 🚫 chặn pdfjs dùng node-canvas
        config.resolve.fallback = {
            ...config.resolve.fallback,
            canvas: false,
            fs: false,
            path: false,
        };

        return config;
    },
};

module.exports = nextConfig;

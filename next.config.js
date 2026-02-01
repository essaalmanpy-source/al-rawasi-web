/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        deviceSizes: [640, 750, 1080, 1200, 1920], // Limit generated image variants
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    transpilePackages: ['lucide-react'],
    // optimizations to reduce memory usage in dev
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2,
    },
};

module.exports = nextConfig;

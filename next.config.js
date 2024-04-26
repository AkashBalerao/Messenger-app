/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  },
};

module.exports = {
  ...nextConfig,
  webpack: (config, { isServer }) => {
    // Add HTML loader rule only for client-side builds
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader',
      });
    }

    return config;
  },
};

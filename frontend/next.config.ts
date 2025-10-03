import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações de performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-avatar', '@radix-ui/react-dialog'],
  },
  // Compressão de imagens
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Compressão gzip
  compress: true,
  // Otimização de CSS
  optimizeFonts: true,
};

export default nextConfig;

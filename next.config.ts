import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'], // Thêm localhost vào đây
  },
};

export default withNextIntl(nextConfig);

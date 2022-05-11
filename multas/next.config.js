/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASEURL: 'http://localhost:3000/',
    BACKEND: 'http://localhost:4448/',
  },
}

module.exports = nextConfig

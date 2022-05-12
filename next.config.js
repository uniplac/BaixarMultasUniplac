/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASEURL: 'https://baixar-multas-uniplac.vercel.app/',
    BACKEND: 'http://api.uniplaclages.edu.br:4448/',
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org', 'ghienphim4.net','cdn.galaxycine.vn','duphim.tv','kenh14cdn.com','static2.vieon.vn','znews-photo.zingcdn.me','assets.glxplay.io','i.mpcdn.top','toplist.vn','image.tmdb.org','i.bloganchoi.com','phimmoiy.net','play-lh.googleusercontent.com','cdn.24h.com.vn','www.facebook.com','www.freepnglogos.com','image.nhandan.vn','youthvietnam.vn','image.baophapluat.vn','thegioidohoa.com','ghienphim3.net'],
  },
  experimental: {
    appDir: true,
  },
  env: {
    HOST: process.env.HOST,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  },
};

module.exports = nextConfig;

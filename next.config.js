/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home/questions",
        permanent: true,
      },
    ];
  },
  env: {
    API_URL: "https://fluttercomm-jdlir.appengine.bfcplatform.vn",
  },
};

module.exports = nextConfig;

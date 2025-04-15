const nextConfig = {
  images: {
    domains: [
      "youradress.com",     // ✅ Add this for production images
      "localhost",          // Optional: keep if you test locally
      "paydpgvbsheucumonhau.supabase.co" // Optional: Supabase
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "youradress.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

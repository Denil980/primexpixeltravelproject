const nextConfig = {
    // Ensure Turbopack uses the project root so package‑lock.json is not ignored
    // This points Turbopack to the directory containing this config file.
    turbopack: {
        root: process.cwd(),
    },
    // Add any other existing config options here
};
export default nextConfig;

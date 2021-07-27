module.exports = {
    reactStrictMode: true,
    images: {
        domains: ["www.google.com", "www.hotavatars.com"],
    },
    async rewrites() {
        return [{
            source: "/:any*",
            destination: "/",
        }, ];
    },
};
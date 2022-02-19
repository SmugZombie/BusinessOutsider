let config = {
    app: {
        port: process.env.PORT,
        env: process.env.ENVIRONMENT,
        example_links: process.env.EXAMPLE_LINKS,
	allowed_domains: process.env.ALLOWED_DOMAINS
    },
    public: {
        prod_directory: "/usr/src/app/public/",
        dev_directory: "/home/regli/github/BusinessOutsider/app/public/"
    }
}

module.exports = config;

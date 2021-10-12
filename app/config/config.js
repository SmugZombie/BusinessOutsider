let config = {
    app: {
        port: process.env.PORT,
        env: process.env.ENVIRONMENT
    },
    public: {
        prod_directory: "/usr/src/app/public/",
        dev_directory: "/home/regli/github/BusinessOutsider/app/public/"
    }
}

module.exports = config;

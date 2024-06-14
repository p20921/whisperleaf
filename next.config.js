const { i18n } = require('./next-i18next.config')

module.exports = {
    i18n,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        })

        return config
    },
    generateBuildId: async () => {
        // You can, for example, get the latest git commit hash here
        return 'www20240427'
    }
}
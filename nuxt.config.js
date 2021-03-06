const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV === 'development';
const isGeneration = process.env.NODE_ENV === 'generation';
const LOCALHOST = `http://localhost:3000`;
const DATA_API = isDevelopment || isGeneration ? LOCALHOST : '';
const REDIRECT_API = isDevelopment ? LOCALHOST : '';

module.exports = {
    head: {
        title: 'Auth Routes',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                content: 'Auth Routes example',
            },
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Pacifico',
            },
            { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        ],
    },
    srcDir: 'client/',
    server: {
        port: 8080,
    },
    env: { DATA_API, REDIRECT_API },
    css: [{ src: '~/assets/scss/main.scss', lang: 'scss' }],
    modules: [
        '@nuxtjs/apollo',
        ['bootstrap-vue/nuxt', { css: false }],
        [
            'nuxt-sass-resources-loader',
            [
                'assets/scss/before/_before.scss',
                'bootstrap/scss/_functions.scss',
                'bootstrap/scss/_variables.scss',
                'bootstrap/scss/_mixins.scss',
                'assets/scss/after/_after.scss',
            ],
        ],
    ],
    plugins: [
        { src: '~/plugins/global', ssr: false },
        { src: '~/plugins/vue-line-clamp', ssr: false },
        { src: '~/plugins/component' },
    ],
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: `${process.env.HTTP_ENDPOINT ||
                    LOCALHOST}/api/graphql`,
            },
        },
    },
    build: {
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });
            }
        },
        postcss: [autoprefixer()],
    },
};

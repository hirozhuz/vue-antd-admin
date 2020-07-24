const path = require('path')


function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH || './',
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@views', resolve('src/views'))
            .set('@router', resolve('src/router'))
            .set('@config', resolve('src/config'))
            .set('@store', resolve('src/store'))
            .set('@service', resolve('src/service'))
            .set('@utils', resolve('src/utils'))
            .set('@components', resolve('src/components'))
            .set('@layout', resolve('src/layout'))
            .set('@mixins', resolve('src/mixins'))
            .set('@weights', resolve('src/weights'))
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7001',
                pathRewrite: {'^/api': ''}
            }
        }
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: true
}

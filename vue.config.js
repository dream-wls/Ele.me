module.exports = {
    devServer: {
        open: true,
        proxy: {
            'api': {
                target: 'http://10.20.159.135:3000',
                changeOrigin: true,
            }
        }
    },
    configureWebpack: {
        resolve: {
          alias: {
            // 别名
            vue$: "vue/dist/vue.esm.js", //加上这一句
  
          }
    }}
}
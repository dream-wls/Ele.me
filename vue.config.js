module.exports = {

    devServer : {
        proxy : {
            '/api' : {
                target : 'http://10.20.159.135:3000',
                changeOrigin : true
            }
        }
    },
    runtimeCompiler : true

};
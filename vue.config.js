module.exports = {
    // ...
    publicPath: "/",
    devServer: {
        port: 9999, // 本地服务访问的端口号，http://localhost:2105/
        open: false, // 告诉dev-server在服务器启动后打开浏览器。将其设置true为打开默认浏览器。
        // 配置代理
        proxy: {
            '/jlxt-base': {
                target: 'http://192.168.14.95:8080/', 
                changeOrigin: true,
                ws: true,
                secure: false
              },
         
        }
    },
   
}
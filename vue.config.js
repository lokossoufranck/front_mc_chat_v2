module.exports = {
	 devServer: {
    compress: true,
    disableHostCheck: true,   // That solved it

 },
	
	publicPath: process.env.NODE_ENV === 'production' ? '/mc_chat' : '/'
}

require.config({
<<<<<<< 436a51d8af33e50f50616a05d9e536d612e40d34
    baseUrl: '//192.168.0.102:3000/m-service-market/dist/js/',
    paths: {
        'lib': '//192.168.0.102:3000/lib',
=======
    baseUrl: '//192.168.1.76:3000/m-service-market/dist/js/',
    paths: {
        'lib': '//192.168.1.76:3000/lib',
>>>>>>> N/A
        'css': 'lib/require/2.1/plugins/css/css', // or whatever the path to require-css is
        'text': 'lib/require/2.1/plugins/text/text', // or whatever the path to require-css is
        'jquery': 'lib/zeptojs/1.1.5/zepto'
    },
    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
    }
});
if (!Function.prototype.bind) {
    // require(['lib/es5-shim/4.0.3/es5-shim']);
}

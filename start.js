/*
 * @name: Bilibili Music Game
 * @Author: Flinx_LY
 * @version: 1.0
 * @description: 通过手机浏览器在Bilibili玩音游
 * @include: 插件生效网站
 * @createTime: 2021.3.31
 * @updateTime: 2021.3.31
 */
(function () {
    /* 遇到这些网站才执行 */
    /* var whiteList = ["m.baidu.com", "www.baidu.com", "sina.cn"];

    if (whiteList.indexOf(window.location.hostname) < 0) {
        return;
    }
    */

    var key = encodeURIComponent("Flinx_LY:Bilibili Music Game:执行判断");

    if (window[key]) {
        return;
    }

    /* 这里写你的代码 */
    try {
        window[key] = true;
        const lib = document.createElement("script");
        lib.src = "https://cdn.jsdelivr.net/gh/Flinx-LY/Bilibili-Music-Game@1.0/main.js";
        lib.defer = true;
        document.body.append(lib);

        var head = document.getElementsByTagName("HEAD").item(0);
        var style = document.createElement("link");
        style.href = "https://cdn.jsdelivr.net/gh/Flinx-LY/Bilibili-Music-Game@1.0/main.css";
        style.rel = "stylesheet";
        style.type = "text/css";
        head.appendChild(style);
    } catch (err) {
        console.log("Bilibili Music Game: ", err);
    }
})();

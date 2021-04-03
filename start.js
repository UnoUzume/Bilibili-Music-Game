/*
 * @name: Bilibili Music Game
 * @Author: Flinx_LY
 * @version: 1.0
 * @description: 通过手机浏览器在Bilibili玩音游
 * @include: m.bilibili.com
 * @createTime: 2021.3.31
 * @updateTime: 2021.3.31
 */
(function () {
    var isEnable = 1; /* 是否启用脚本：1启用，0禁用 */

    var whiteList = ["m.bilibili.com"];
    if (whiteList.indexOf(window.location.hostname) < 0) {
        return;
    }
    var key = encodeURIComponent("Flinx_LY:Bilibili Music Game:执行判断");
    if (window[key] && isEnable == 1) {
        return;
    }
    try {
        window[key] = true;
        let hostlist = [
            "https://cdn.jsdelivr.net/gh/Flinx-LY/Bilibili-Music-Game@latest/",
            "http://192.168.43.110:5500/",
        ];
        let hostname = hostlist[0];
        const lib = document.createElement("script");
        lib.src = hostname + "main.js";
        lib.defer = true;
        document.body.append(lib);

        var head = document.getElementsByTagName("HEAD").item(0);
        var style = document.createElement("link");
        style.href = hostname + "main.css";
        style.rel = "stylesheet";
        style.type = "text/css";
        head.appendChild(style);
    } catch (err) {
        console.log("Bilibili Music Game: ", err);
    }
})();

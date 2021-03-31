(function () {
    /* 遇到这些网站才执行 */
    // var whiteList = ["m.baidu.com", "www.baidu.com", "sina.cn"];

    // if (whiteList.indexOf(window.location.hostname) < 0) {
    //     return;
    // }

    var key = encodeURIComponent("Flinx_LY:Bilibili Music Game:执行判断");

    if (window[key]) {
        return;
    }

    /* 这里写你的代码 */
    try {
        window[key] = true;
        const lib = document.createElement("script");
        lib.src = "http://127.0.0.1:5500/main.js";
        lib.defer = true;
        document.body.append(lib);
    } catch (err) {
        console.log("Bilibili Music Game: ", err);
    }
})();
(function () {
    /* 遇到这些网站才执行 */
    // var whiteList = ["m.baidu.com", "www.baidu.com", "sina.cn"];

    // if (whiteList.indexOf(window.location.hostname) < 0) {
    //     return;
    // }

    var key = encodeURIComponent("Flinx_LY:Bilibili Music Game:执行判断");

    if (window[key]) {
        return;
    }

    /* 这里写你的代码 */
    try {
        window[key] = true;
        const lib = document.createElement("script");
        lib.src = "http://127.0.0.1:5500/main.js";
        lib.defer = true;
        document.body.append(lib);

        var head = document.getElementsByTagName("HEAD").item(0);
        var style = document.createElement("link");
        style.href = "http://127.0.0.1:5500/main.css";
        style.rel = "stylesheet";
        style.type = "text/css";
        head.appendChild(style);
    } catch (err) {
        console.log("Bilibili Music Game: ", err);
    }
})();

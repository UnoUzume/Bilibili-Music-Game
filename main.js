var bili_display = document.querySelector(".player-mobile-box .player-mobile-display");

var game_window = document.createElement("div");
game_window.setAttribute("id", "game-window");
game_window.className = "game-window";
bili_display.appendChild(game_window);

var player_button = document.querySelector(".player-mobile-pause-icon");
player_button.addEventListener("touchstart", play_button_fun);
function play_button_fun() {
    if (isReady && notes) {
        player_button.removeEventListener("touchstart", play_button_fun);
        let delay = parseInt(document.getElementById("notes-delay").value);
        if (!delay) {
            delay = 0;
        }
        timeStart = Date.now() - delay;
        animloop();
    }
}

var info_box = document.createElement("div");
info_box.setAttribute("id", "info-box");
info_box.className = "info-box";
info_box.innerHTML = "BMG插件已加载，点亮准备按钮再点击播放按钮开始游戏";
game_window.appendChild(info_box);

var ready_button = document.createElement("div");
ready_button.setAttribute("id", "ready-button");
ready_button.className = "ready-button";
ready_button.innerText = "准备";
ready_button.addEventListener("touchstart", function (e) {
    if (!isReady) {
        isReady = true;
        ready_button.classList.add("isReady");
        game_window.style.pointerEvents = "auto";
    } else {
        isReady = false;
        ready_button.classList.remove("isReady");
        game_window.style.pointerEvents = "none";
    }
});
bili_display.appendChild(ready_button);

var config_mask = document.createElement("div");
config_mask.setAttribute("id", "config-mask");
config_mask.className = "config-mask";
config_mask.addEventListener("touchstart", function (e) {
    setTimeout(function () {
        config_mask.style.display = "none";
    }, 400);
    config_panel.classList.remove("in");
});
bili_display.appendChild(config_mask);

var config_panel = document.createElement("div");
config_panel.setAttribute("id", "config-panel");
config_panel.className = "config-panel";
config_panel.innerHTML =
    '<label for=""> 谱面延时： <input type="number" name="" id="notes-delay" /> </label> <br /> <label for=""> 谱面选择： <select> <option value="001">001</option> </select> </label> <br /> <label for=""> 在线加载： <input type="text" name="" id="notes-url" value="https://cdn.jsdelivr.net/gh/Flinx-LY/Bilibili-Music-Game@latest/NoteSheets/001.json" /> </label> <button>加载</button> <br /> <label for="">谱面编辑：</label> <br /> <textarea name="" id="notes-editor" cols="30" rows="5"></textarea> <br /> <button>提交修改</button>';
config_panel.addEventListener("touchstart", function (e) {
    game_window.classList.add("in");
});
bili_display.appendChild(config_panel);
var httpRequest = new XMLHttpRequest();
httpRequest.open("GET", document.getElementById("notes-url").value, true);
httpRequest.send();
httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        let json_text = httpRequest.responseText;
        document.getElementById("notes-editor").innerText = json_text;
        notes = JSON.parse(json_text).notes;
    }
};

var config_button = document.createElement("div");
config_button.setAttribute("id", "config-button");
config_button.className = "config-button";
config_button.innerText = "设置";
config_button.addEventListener("touchstart", function (e) {
    config_mask.style.display = "block";
    config_panel.classList.add("in");
});
bili_display.appendChild(config_button);

var line = document.createElement("div");
line.setAttribute("id", "line");
line.className = "line";
game_window.appendChild(line);

var note_box = document.createElement("div");
note_box.setAttribute("id", "note-box");
note_box.className = "note-box";
game_window.appendChild(note_box);

game_window.addEventListener(
    "touchmove",
    function (e) {
        e.preventDefault();
    },
    true
);
document
    .querySelector(".m-video-new")
    .insertBefore(document.querySelector(".m-video-player"), document.querySelector(".m-navbar"));
document.querySelector(".player-mobile-btn-widescreen").style.display = "none";
document.querySelector(".m-video-player").style.marginBottom = window.screen.height + "px";
document.querySelector("#bilibiliPlayer").style.transform = "rotate(90deg)";
document.querySelector("#bilibiliPlayer").style.height = document.body.clientWidth + "px";
document.querySelector(".player-mobile").style.width = window.screen.height + "px";

console.log("Flinx_LY:Bilibili Music Game  已加载");

var isReady = false;
var notes = null;
var noteIndex = 0;

var num_perfect = 0;
var num_great = 0;
var num_bad = 0;
var num_miss = 0;
var line_top = 0;

var timeStart = 0;
function note_touch(e) {
    const noteNode_bound = e.target.getElementsByClassName("note")[0].getBoundingClientRect();
    // const note_top = (noteNode_bound.bottom + noteNode_bound.top) / 2;
    const note_top = (noteNode_bound.left + noteNode_bound.right) / 2;
    const distance = line_top - note_top;
    if (distance < -10) {
        note_del(e.target, 1);
        num_great++;
    } else if (distance < 15) {
        note_del(e.target, 0);
        num_perfect++;
    } else if (distance < 25) {
        note_del(e.target, 1);
        num_great++;
    } else if (distance < 40) {
        note_del(e.target, 2);
        num_bad++;
    }
}
function animloop() {
    let timenow = Date.now() - timeStart;
    var info_str = "Time: " + timenow + "<br>";
    var info_str = "Time: " + timenow + "<br>";

    const line = document.querySelector("#line");
    if (line) {
        const line_bound = line.getBoundingClientRect();
        // line_top = (line_bound.bottom + line_bound.top) / 2;
        line_top = (line_bound.left + line_bound.right) / 2;
    } else {
        line_top = 0;
    }

    while (notes[noteIndex] && timenow + 2200 >= notes[noteIndex][0]) {
        if (notes[noteIndex][1] == 1) {
            var note_wrap = document.createElement("div");
            note_wrap.className = "note-wrap";
            note_wrap.style.left = notes[noteIndex][2] + "%";
            note_wrap.addEventListener("touchstart", note_touch);
            var note = document.createElement("div");
            note.className = "note";
            note_wrap.appendChild(note);
            note_box.appendChild(note_wrap);
            noteL = note_box.childNodes;
            for (let index = 0; index < noteL.length; index++) {
                const element = noteL[index];
                element.style.zIndex = 100 - index;
            }
        }
        noteIndex++;
    }
    info_box.innerHTML =
        info_str +
        "Perfect:" +
        num_perfect +
        "<br>Great:  " +
        num_great +
        "<br>Bad:    " +
        num_bad +
        "<br>Miss:   " +
        num_miss +
        "<br><br>";

    if (notes[noteIndex]) {
        requestAnimationFrame(animloop);
    }
}
document.body.addEventListener("webkitAnimationEnd", function (e) {
    if (e.target.className == "note") {
        note_del(e.target.parentNode, 3);
        num_miss++;
    } else {
        e.target.parentNode.removeChild(e.target);
    }
});
function note_del(noteNode, level) {
    const noteNode_bound = noteNode.firstChild.getBoundingClientRect();
    const top = parseInt((noteNode_bound.bottom + noteNode_bound.top) / 2 - game_window.getBoundingClientRect().top);
    // const left = parseInt((noteNode_bound.right + noteNode_bound.left) / 2 - game_window.getBoundingClientRect().left);
    const right = parseInt(
        game_window.getBoundingClientRect().right - (noteNode_bound.right + noteNode_bound.left) / 2
    );
    var elem = document.createElement("div");
    elem.style.left = top + "px";
    elem.style.top = right + "px";
    elem.classList.add("note-hide");
    elem.classList.add("note-hide" + level);
    game_window.appendChild(elem);
    noteNode.parentNode.removeChild(noteNode);
}

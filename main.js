var bili_display = document.querySelector(".player-mobile-box .player-mobile-display");

var game_window = document.createElement("div");
game_window.setAttribute("id", "game-window");
game_window.className = "game-window";
// var player_box = document.querySelector(".player-mobile-box");
game_window.addEventListener("touchstart", play_button_fun);
function play_button_fun() {
    game_window.removeEventListener("touchstart", play_button_fun);
    timeStart = Date.now();
    animloop();
}
bili_display.appendChild(game_window);

var info_box = document.createElement("div");
info_box.setAttribute("id", "info-box");
info_box.className = "info-box";
info_box.innerHTML = "BMG插件已加载，点击画面开始游戏";
game_window.appendChild(info_box);

var line = document.createElement("div");
line.setAttribute("id", "line");
line.className = "line";
game_window.appendChild(line);

var note_box = document.createElement("div");
note_box.setAttribute("id", "note-box");
note_box.className = "note-box";
game_window.appendChild(note_box);

console.log("Flinx_LY:Bilibili Music Game  已加载");

var notes = [
    [2270, 1, "50%"],
    [3220, 1, "20%"],
    [3850, 1, "50%"],
    [4100, 1, "60%"],
    [4970, 1, "70%"],
    [5390, 1, "10%"],
    [5850, 1, "20%"],
    [6720, 1, "60%"],
    [7140, 1, "70%"],
    [7350, 1, "60%"],
    [7600, 1, "50%"],
    [8560, 1, "20%"],
    [8930, 1, "60%"],
    [9390, 1, "40%"],
    [10310, 1, "90%"],
    [10720, 1, "50%"],
    [11100, 1, "70%"],
    [12060, 1, "40%"],
    [12470, 1, "60%"],
    [12890, 1, "50%"],
    [13770, 1, "70%"],
    [14220, 1, "20%"],
    [14680, 1, "30%"],
    [15560, 1, "60%"],
    [16470, 1, "20%"],
    [18220, 1, "50%"],
    [19970, 1, "80%"],
    [21720, 1, "30%"],
    [23470, 1, "90%"],
    [25270, 1, "30%"],
    [25680, 1, "50%"],
    [26100, 1, "30%"],
    [26970, 1, "70%"],
    [28770, 1, "20%"],
    [29680, 1, "70%"],
    [30560, 1, "50%"],
    [31390, 1, "60%"],
    [31720, 1, "30%"],
    [32270, 1, "10%"],
    [32720, 1, "60%"],
    [33180, 1, "40%"],
    [33600, 1, "80%"],
    [34100, 1, "60%"],
    [34520, 1, "20%"],
    [34930, 1, "30%"],
    [35390, 1, "40%"],
    [35890, 1, "20%"],
    [36310, 1, "60%"],
    [36720, 1, "50%"],
    [37140, 1, "60%"],
    [50000, 0, "70%"],
];
var noteIndex = 0;

var num_perfect = 0;
var num_great = 0;
var num_bad = 0;
var num_miss = 0;
var line_top = 0;

var timeStart = 0;
function animloop() {
    let timenow = Date.now() - timeStart;
    var info_str = "Time: " + timenow + "<br>";

    const line = document.querySelector("#line");
    if (line) {
        const line_bound = line.getBoundingClientRect();
        line_top = (line_bound.bottom + line_bound.top) / 2;
    } else {
        line_top = 0;
    }

    while (notes[noteIndex] && timenow + 2200 >= notes[noteIndex][0]) {
        if (notes[noteIndex][1] == 1) {
            var note_wrap = document.createElement("div");
            note_wrap.className = "note-wrap";
            note_wrap.style.left = notes[noteIndex][2];
            note_wrap.addEventListener("touchstart", function (e) {
                const noteNode_bound = e.target.getElementsByClassName("note")[0].getBoundingClientRect();
                const note_top = (noteNode_bound.bottom + noteNode_bound.top) / 2;
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
            });
            var note = document.createElement("div");
            note.className = "note";
            note_wrap.appendChild(note);
            note_box.appendChild(note_wrap);
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
    if (e.target.className == "note-wrap") {
        note_del(e.target, 3);
        num_miss++;
    } else {
        e.target.parentNode.removeChild(e.target);
    }
});

function note_del(noteNode, level) {
    const noteNode_bound = noteNode.getBoundingClientRect();
    const top = parseInt((noteNode_bound.bottom + noteNode_bound.top) / 2 - game_window.getBoundingClientRect().top);
    const left = parseInt((noteNode_bound.right + noteNode_bound.left) / 2 - game_window.getBoundingClientRect().left);
    var elem = document.createElement("div");
    elem.style.left = left + "px";
    elem.style.top = top + "px";
    elem.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><rect width="20" height="20"></rect></svg>';
    elem.classList.add("note-hide");
    elem.classList.add("note-hide" + level);
    game_window.appendChild(elem);
    noteNode.parentNode.removeChild(noteNode);
}

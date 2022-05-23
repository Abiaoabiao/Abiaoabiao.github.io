import { playerMove, isWin } from "./play.js"
import showUI from "./ui.js"
import {timer,t} from "./time.js"

showUI();
var over = false
//完成整个游戏

window.onkeydown = function (e) {
    if(e.key === "Enter") {
        window.location.reload()
    }
    if (over) {
        return;
    }
    if (t == 0) {
        alert('游戏结束')
        over = true;
    }
    var result = false;
    if (e.key === "ArrowUp") {
        result = playerMove("up");
    }
    else if (e.key === "ArrowDown") {
        result = playerMove("down")
    }
    else if (e.key === "ArrowLeft") {
        result = playerMove("left")
    }
    else if (e.key === "ArrowRight") {
        result = playerMove("right")
    }
    if (result) {
        
        if (isWin()) {
            alert("游戏胜利！");
            clearInterval(timer);
            over = true;
        }
        showUI();
    }
}

//getTime,返回 时 分 秒
function getTime(t) {
    var h = parseInt(t / 3600);
    var m = parseInt((t % 3600) / 60);
    var s = t % 60;
    return {
        hour: h,
        minute: m,
        second: s,
    };
}
//不足10的前补零
function format(obj) {
    if (obj.hour < 10) {
        obj.hour = "0" + obj.hour;
    }
    if (obj.minute < 10) {
        obj.minute = "0" + obj.minute;
    }
    if (obj.second < 10) {
        obj.second = "0" + obj.second;
    }
}
// 渲染函数

//定义时间
export var t = 300;
var hDom = document.getElementById("h");
var mDom = document.getElementById("m");
var sDom = document.getElementById("s");

//定义一个huoObj来获取getTime的时分秒
var huoObj = getTime(t);
format(huoObj);
//重新渲染
export var timer = setInterval(function () {
    t--;
    huoObj = getTime(t);
    format(huoObj);
    render();
    if (t == 0) {
        clearInterval(timer);
    }
}, 1000);
export function render() {
    hDom.innerHTML = huoObj.hour;
    mDom.innerHTML = huoObj.minute;
    sDom.innerHTML = huoObj.second;
}

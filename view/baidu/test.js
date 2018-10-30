// 更新cookie
var url = 'https://zhidao.baidu.com/question/1539915242186293547.html'
// 更新前端变量 重载js (不行)
var url2 = 'https://iknowpc.bdimg.com/static/common/pkg/lib.33719ed.js'
// 重载localStorage (不行)

var that = $;

// 业务代码：
var num = 0;
var time = 1000;
var arr = [];
var request = new XMLHttpRequest();

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

// 重载全部js
// 2:添加script标签
function test(url) {
    var scriptObj = document.createElement("script");
    scriptObj.src = url + '?time=' + new Date().getTime() + 'end';
    scriptObj.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(scriptObj);
}
// 1:获取全部js 
var doms = document.getElementsByTagName('script');
var jsArr = [];
for (var i = 0; i < doms.length; i++) {
    if (doms[i].src && i != 14) {
        jsArr.push(doms[i].src);
    }
}

document.getElementById('evaluate-bad-1646521980').onclick = function () {
    setTimeout(function () {
        if (num > 10) {
            return;
        }
        setCookie('BAIDUID', Date.now().toString(16).slice(-5));
        request.onreadystatechange = function () { // 状态发生变化时，函数被回调
            if (request.readyState === 4) { // 成功完成
                console.log(123);
                console.log(num);
                arr = Object.keys(localStorage);
                console.log(arr);
                var i = arr.length - 1
                localStorage.removeItem(arr[i]);
                jsArr.map(v => {
                    console.log(v);
                    test(v);
                })
                num++;
                that('#evaluate-bad-1646521980').click();
            } else {
                // HTTP请求还在继续...
            }
        }
        request.open('GET', url);
        request.send();
    }, time);
}
that('#evaluate-bad-1646521980').click();


// 额外功能
function reloadAbleJSFn(id, newJS) {
    var oldjs = null;
    var oldjs = document.getElementById(id);
    if (oldjs) oldjs.parentNode.removeChild(oldjs);
    var scriptObj = document.createElement("script");
    scriptObj.src = newJS + '?time=' + new Date().getTime() + 'end';
    scriptObj.type = "text/javascript";
    scriptObj.id = id;
    document.getElementsByTagName("head")[0].appendChild(scriptObj);
}
that('#evaluate-bad-1646521980').click();
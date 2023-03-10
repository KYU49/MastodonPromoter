var hist = ["r1"];
window.onload = function(){
    let li = document.getElementsByTagName("li");
    // 最初のカード以外は隠す
    li[0].classList.add("first");
    for(let i = 0; i < li.length; i++){
        // カード内の全てのボタンにイベント設定
        let nextButton = li[i].getElementsByClassName("next");
        for(let j = 0; j < nextButton.length; j++){
            let bt = nextButton[j];
            bt.addEventListener("click", function(){
                li[i].classList.remove("current");   // 現在答え中フラグ解除
                li[i].classList.remove("current_back");   // 現在答え中フラグ解除
                li[i].classList.add("answered");    // 答え済みに設定
                let targetId = bt.getAttribute("next");
                let target = document.getElementById(targetId);
                if(target){
                    target.classList.add("current");
                    target.classList.remove("hide");
                }
                hist.push(targetId);
            });
        }

        // Shareボタン
        if(li[i].classList.contains("share")){
            let a = document.createElement("a");
            a.href = "http://twitter.com/share?url=" + location.href + "?" + li[i].id + "&text=" + "あなたにぴったりのMastodonインスタンスは「" + li[i].getElementsByClassName("title")[0].innerText +"」" + "&hashtags=Mastodon診断";
            a.text = "Tweeterで共有！";
            a.style.margin = "10px 0 10px 0";
            a.target = "_blank";
            li[i].appendChild(a);
        }
    }

    // 戻るボタン
    document.getElementById("back").onclick = function(){
        if(hist.length - 2 >= 0){
            let li = document.getElementsByTagName("li");
            for(let i = 0; i < li.length; i++){
                li[i].classList.add("hide");
                li[i].classList.remove("current");
                li[i].classList.remove("current_back");
                li[i].classList.remove("answered");
                li[i].classList.remove("first");
            }
            let target = document.getElementById(hist[hist.length - 2]);
            target.classList.remove("hide");
            target.classList.add("current_back");
            hist.pop();
        }
    };   
    if(location.search){
        moveTo(location.search.substring(1));
    }
}
function moveTo(targetId, current = document.getElementById(hist[0])){
    let target = document.getElementById(targetId);
    if(target){
        current.classList.remove("current");
        current.classList.remove("current_back");
        current.classList.add("answered");

        target.classList.add("current");
        target.classList.remove("hide");
        hist.push(targetId);
    }
}
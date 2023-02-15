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
            a.href = "https://twitter.com/share?ref_src=twsrc%5Etfw";
            a.classList.add("twitter-share-button");
            a.setAttribute("data-text", "あなたにぴったりのMastodonインスタンスは「" + li[i].getElementsByClassName("title")[0].innerText +"」");
            a.setAttribute("data-url", location.href + "?" + li[0].id);
            a.setAttribute("data-hashtags", "Mastodon診断");
            a.text = "Tweeterで共有！";
            a.target = "_blank";
            a.style.margin = "5px 0 5px 0";
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
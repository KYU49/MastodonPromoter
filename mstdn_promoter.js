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
    
}
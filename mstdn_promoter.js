window.onload = function(){
    let li = document.getElementsByTagName("li");
    for(let i = 0; i < li.length; i++){
        let nextButton = li[i].getElementsByClassName("next");
        for(let j = 0; j < nextButton.length; j++){
            nextButton[j].addEventListener("click", function(){
                li[i].classList.remove("answer");
                li[i].classList.add("answered");
                if(i + 1 < li.length){
                    li[i + 1].classList.add("answer");
                    li[i + 1].classList.remove("hide");
                }
            });
        }
        if(i > 0){
            li[i].classList.add("hide");
        }
    }
}
function count(i){
    let e = document.getElementById("counter");
    e.innerText = parseInt(e.innerText) + i;
}
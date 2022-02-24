//로그인&회원가입
document.addEventListener("DOMContentLoaded", function () {
    //로그인&회원가입

    const login = document.querySelector(".login");
    const signUp = document.querySelector(".signUp");
    const loginOption = document.querySelector(".loginOption");
    const singupOption = document.querySelector(".singupOption");
    const loginCell = document.querySelectorAll(".loginCell");
    let clickLoginCount = 0;

    login.addEventListener("click", changeToBlockLogin);
    signUp.addEventListener("click", changeToBlockSingup);
    function changeToBlockLogin() {
        
        loginOption.classList.remove("displayNone");
        loginOption.classList.add("displayFlex");
        if (singupOption.classList.contains("displayFlex")) {
            singupOption.classList.remove("displayFlex");
            singupOption.classList.add("displayNone");
        }
    }
    function changeToBlockSingup() {
        singupOption.classList.remove("displayNone");
        singupOption.classList.add("displayFlex");
        if (loginOption.classList.contains("displayFlex")) {
            loginOption.classList.remove("displayFlex");
            loginOption.classList.add("displayNone");
        }
    }

    login.addEventListener("blur", closeToLogin);
    signUp.addEventListener("blur", closeToSignUp);
    function closeToLogin() {
        if (clickLoginCount == 0) {
            loginOption.classList.remove("displayFlex");
            loginOption.classList.add("displayNone");
        }
    }
    function closeToSignUp() {
        if (clickLoginCount == 0) {
            singupOption.classList.remove("displayFlex");
            singupOption.classList.add("displayNone");
        }
    }

    
    for(let i=0;i<loginCell.length;i++){
        loginCell[i].addEventListener("mouseover", clickLoginCounting)
        loginCell[i].addEventListener("mouseout", clickLoginCountingDown)
    }

    
    function clickLoginCounting() {
        
        clickLoginCount = 1;
    }
    
    function clickLoginCountingDown() {
        clickLoginCount = 0;
        
    }
    


});




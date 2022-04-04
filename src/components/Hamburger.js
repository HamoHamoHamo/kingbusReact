
document.addEventListener("DOMContentLoaded", function () {
    //햄버거메뉴
    const hembugerBtn = document.querySelector(".hembugerButton");
    const hembugermenu = document.querySelector(".hembugerBg");
    const hembugerCover = document.querySelector(".hembugerCover");
    const hembugerLogin = document.querySelector(".hembugerLogin");
    const hembugerSignup = document.querySelector(".hembugerSignup");
    const hembugerLoginBox = document.querySelector(".hembugerLoginBox");
    const hembugerSignupBox = document.querySelector(".hembugerSignupBox");
    const hembugerBtnTool = document.querySelector(".hembugerBtnTool");
    const hembugerNav = document.querySelector(".hembugerNav");
    const turnBackHemburger = document.querySelectorAll(".turnBackHemburger");


    hembugerBtn.addEventListener("click", openHembuger);
    function openHembuger() {
        if (hembugermenu.style.display == "none") {
            hembugermenu.style.display = "flex";
        } else {
            hembugermenu.style.display = "none";
        }
    }
    hembugerCover.addEventListener("click", closeHembuger);
    function closeHembuger() {
        hembugermenu.style.display = "none";
    }
    hembugerLogin.addEventListener("click", openHembugerLogin);
    function openHembugerLogin() {
        if (hembugerLoginBox.style.display == "none") {
            hembugerLoginBox.style.display = "flex"
            hembugerBtnTool.style.display = "none"
            hembugerNav.style.display = "none"
        } else {
            hembugerLoginBox.style.display = "none"
            hembugerBtnTool.style.display = "flex"
            hembugerNav.style.display = "flex"
        }
    }

    hembugerSignup.addEventListener("click", openHembugerSignup);
    function openHembugerSignup() {
        if (hembugerSignupBox.style.display == "none") {
            hembugerSignupBox.style.display = "flex"
            hembugerBtnTool.style.display = "none"
            hembugerNav.style.display = "none"
        } else {
            hembugerSignupBox.style.display = "none"
            hembugerBtnTool.style.display = "flex"
            hembugerNav.style.display = "flex"
        }
    }
    for (let i = 0; i < 2; i++) {
        turnBackHemburger[i].addEventListener("click", turningBackHemburger);
    }

    function turningBackHemburger() {
        hembugerLoginBox.style.display = "none";
        hembugerSignupBox.style.display = "none";
        hembugerBtnTool.style.display = "flex";
        hembugerNav.style.display = "flex";

    }
})
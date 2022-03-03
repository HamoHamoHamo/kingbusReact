// 경유지 삭제
export function removeWaypointDiv() {
    let deletWayPoint = this.parentElement;
    deletWayPoint.remove();
}

//로그인&회원가입
document.addEventListener("DOMContentLoaded", function () {
    //로그인&회원가입
    
    const login = document.querySelector(".login");
    const signUp = document.querySelector(".signUp");
    const loginOption = document.querySelector(".loginOption");
    const singupOption = document.querySelector(".singupOption");
    const loginCell = document.querySelectorAll(".loginCell");
    let clickLoginCount = 0;

    if(login){
        login.addEventListener("click", changeToBlockLogin);
        login.addEventListener("blur", closeToLogin);
    }
    if(signUp){
        signUp.addEventListener("click", changeToBlockSingup);
        signUp.addEventListener("blur", closeToSignUp);
    }
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


    for (let i = 0; i < loginCell.length; i++) {
        loginCell[i].addEventListener("mouseover", clickLoginCounting)
        loginCell[i].addEventListener("mouseout", clickLoginCountingDown)
    }


    function clickLoginCounting() {

        clickLoginCount = 1;
    }

    function clickLoginCountingDown() {
        clickLoginCount = 0;

    }

    //메인2 이미지전환
    const secondContainerNav = document.querySelectorAll(".secondContainerNav")
    const thisImg00 = document.querySelector(".thisImg00")
    const thisImg11 = document.querySelector(".thisImg11")
    const thisImg22 = document.querySelector(".thisImg22")
    const thisImg33 = document.querySelector(".thisImg33")
    const thisImg44 = document.querySelector(".thisImg44")
    const thisImg55 = document.querySelector(".thisImg55")
    for (let i = 0; i < 6; i++) {
        secondContainerNav[i].addEventListener("click", changeToBlockLogin);
        function changeToBlockLogin() {
            for (let i = 0; i < 6; i++) {
                secondContainerNav[i].classList.remove("secondContainerNavThis")
                secondContainerNav[i].classList.add("secondContainerNavNotThis")
            }
            if (this.classList.contains("secondContainerNavNotThis")) {
                this.classList.remove("secondContainerNavNotThis");
                this.classList.add("secondContainerNavThis");
                thisImg00.classList.remove("displayBlock")
                thisImg00.classList.add("displayNone")
                thisImg11.classList.remove("displayBlock")
                thisImg11.classList.add("displayNone")
                thisImg22.classList.remove("displayBlock")
                thisImg22.classList.add("displayNone")
                thisImg33.classList.remove("displayBlock")
                thisImg33.classList.add("displayNone")
                thisImg44.classList.remove("displayBlock")
                thisImg44.classList.add("displayNone")
                thisImg55.classList.remove("displayBlock")
                thisImg55.classList.add("displayNone")
                if (this.classList.contains("thisImg0")) {
                    thisImg00.classList.remove("displayNone")
                    thisImg00.classList.add("displayBlock")
                } else if (this.classList.contains("thisImg1")) {
                    thisImg11.classList.remove("displayNone")
                    thisImg11.classList.add("displayBlock")
                } else if (this.classList.contains("thisImg2")) {
                    thisImg22.classList.remove("displayNone")
                    thisImg22.classList.add("displayBlock")
                } else if (this.classList.contains("thisImg3")) {
                    thisImg33.classList.remove("displayNone")
                    thisImg33.classList.add("displayBlock")
                } else if (this.classList.contains("thisImg4")) {
                    thisImg44.classList.remove("displayNone")
                    thisImg44.classList.add("displayBlock")
                } else if (this.classList.contains("thisImg5")) {
                    thisImg55.classList.remove("displayNone")
                    thisImg55.classList.add("displayBlock")
                }

            }
        }
    }

    //메인4 리뷰 슬라이드
    const reviewPrevBtn = document.querySelector('.reviewPrevBtn');
    const reviewNextBtn = document.querySelector('.reviewNextBtn');
    let reviewIndex = document.querySelector('.reviweBox').childElementCount;

    reviewPrevBtn.addEventListener('click', function (e) {

        const screen = [];
        //const cell = document.querySelector(`.reviweCell2`);
        //cell.classList.add("reviewNextAnimation")
        for (let i = 0; i < 5; i++) {
            //screen.push(document.querySelector(`.reviweCell${i}`))
            const cell = document.querySelector(`.reviweCell${i}`);

            if (i === 2) {
                cell.id = "revNextAniCenter";
            } else if (i === 1) {
                console.log("CCCCCCCCC", cell);
                cell.id = "revNextAnitoCenter";
            } else {
                cell.id = "revNextAni";
            }
        }
        for (let i = 0; i < reviewIndex; i++) {
            let box = document.querySelector(`.reviweCell${i}`);
            box.classList.remove(`reviweCell${i}`)
            screen.push(box);
            //console.log(box);
        }

        for (let i = 0; i < reviewIndex; i++) {

            if (i === reviewIndex - 1) {
                screen[i].classList.add(`reviweCell0`)
            } else {
                screen[i].classList.add(`reviweCell${i + 1}`)
            }
            //console.log("BOX", screen[i]);
        }

        // console.log("screen",screen);
    });

    reviewNextBtn.addEventListener('click', function (e) {
        const screen = [];
        //const cell = document.querySelector(`.reviweCell2`);
        //cell.classList.add("reviewNextAnimation")
        for (let i = 0; i < 5; i++) {
            //screen.push(document.querySelector(`.reviweCell${i}`))
            const cell = document.querySelector(`.reviweCell${i}`);
            if (i === 2) {
                cell.id = "revNextAniCenter"
            } else if (i === 3) {
                console.log("CCCCCCCCC", cell);
                cell.id = "revNextAnitoCenter"
            } else {
                cell.id = "revNextAni"
            }
        }
        for (let i = 0; i < reviewIndex; i++) {
            let box = document.querySelector(`.reviweCell${i}`);
            box.classList.remove(`reviweCell${i}`)
            screen.push(box);
            //console.log(box);
        }
        console.log("SCRREEEN", screen);
        for (let i = reviewIndex - 1; i >= 0; i--) {
            if (i === 0) {
                screen[i].classList.add(`reviweCell9`)
            } else {
                screen[i].classList.add(`reviweCell${i - 1}`)
            }
            //console.log("BOX", screen[i]);
        }

        // console.log("screen",screen);
    })





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



    //편도 왕복
    const oneWay = document.querySelector(".oneWay");
    const twoWay = document.querySelector(".twoWay");
    const blinkcell = document.querySelector(".blinkcell");

    oneWay.addEventListener("click", clickOneWay);
    function clickOneWay() {
        oneWay.style.borderRadius = "0.4rem 0 0 0.4rem";
        oneWay.style.backgroundColor = "#B00020";
        oneWay.style.color = "white";
        twoWay.style.borderRadius = "0 0.4rem 0.4rem 0";
        twoWay.style.backgroundColor = "white";
        twoWay.style.color = "#B00020";
        blinkcell.style.display = "flex"
    }

    twoWay.addEventListener("click", clickTwoWay);
    function clickTwoWay() {
        twoWay.style.borderRadius = "0 0.4rem 0.4rem 0";
        twoWay.style.backgroundColor = "#B00020";
        twoWay.style.color = "white";
        oneWay.style.borderRadius = "0.4rem 0 0 0.4rem";
        oneWay.style.backgroundColor = "white";
        oneWay.style.color = "#B00020";
        blinkcell.style.display = "none"
    }

    //주문신청
    const applicationBtn = document.querySelector(".applicationBtn")
    const firstOrderPage = document.querySelector(".firstOrderPage")
    const secondOrderPage = document.querySelector(".secondOrderPage")
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAWWWWWWWWWWWWWWWWWWWWWWWWW", applicationBtn );
    applicationBtn.addEventListener("click", startOrder);

    function startOrder() {
        console.log("CLLLLLLLLLLL")
        firstOrderPage.classList.add("displayNone")
        secondOrderPage.classList.remove("displayNone")
        firstContainer.classList.remove("firstContainerJs")
        firstContainer.classList.add("firstContainerJsTop")
        firstContainerImgSizing.classList.remove("firstContainerImgSizingJs")
        firstContainerImg.classList.remove("firstContainerImgJs")
        firstContainerImgCover.classList.remove("firstContainerImgCoverJs")
    }

    //경유지
    const firstContainer = document.querySelector(".firstContainer");
    const addWaypoint = document.querySelector(".addWaypoint");
    const addWaypointText = document.querySelector(".addWaypoint span");
    const addWaypointImg = document.querySelectorAll(".addWaypoint img");
    const choiceCell = document.querySelectorAll(".choiceCell");
    const choiceBox = document.querySelectorAll(".choiceBox");
    const firstContainerImgSizing = document.querySelector(".firstContainerImgSizing");
    const firstContainerImg = document.querySelector(".firstContainerImg");
    const firstContainerImgCover = document.querySelector(".firstContainerImgCover");

    addWaypoint.addEventListener("click", addWaypointBox);
    function addWaypointBox() {
        if (addWaypointText.innerText == "경유지 추가") {
            choiceCell[1].classList.remove("displayNone");
            addWaypointText.innerText = "경유지 삭제"
            choiceBox[0].classList.add("choiceBoxJs")
            addWaypointImg[0].classList.add("displayNone")
            addWaypointImg[1].classList.remove("displayNone")
            firstContainer.classList.add("firstContainerJs")
            firstContainerImgSizing.classList.add("firstContainerImgSizingJs")
            firstContainerImg.classList.add("firstContainerImgJs")
            firstContainerImgCover.classList.add("firstContainerImgCoverJs")
        } else {
            choiceCell[1].classList.add("displayNone");
            addWaypointText.innerText = "경유지 추가"
            choiceBox[0].classList.remove("choiceBoxJs")
            addWaypointImg[0].classList.remove("displayNone")
            addWaypointImg[1].classList.add("displayNone")
            firstContainer.classList.remove("firstContainerJs")
            firstContainerImgSizing.classList.remove("firstContainerImgSizingJs")
            firstContainerImg.classList.remove("firstContainerImgJs")
            firstContainerImgCover.classList.remove("firstContainerImgCoverJs")
        }
    }

    
    //경유지 추가
    const WaypointScrollBox = document.querySelector(".WaypointScrollBox")
    const MoreWaypointBtn = document.querySelector(".MoreWaypoint")

    //MoreWaypointBtn.addEventListener("click", addMoreWaypoint)
    

    function addMoreWaypoint() {
        console.log("MoreWaypointBtn")
        const MoreWaypointDiv = document.createElement("div");
        MoreWaypointDiv.classList.add("orderInputCell")
        MoreWaypointDiv.classList.add("itIsWaypoit")
        const MoreWaypointInput = document.createElement("input");
        MoreWaypointInput.classList.add("orderInputCellTextWaypoint")
        MoreWaypointInput.placeholder = "경유지"
        MoreWaypointInput.name = "wayPointList"
        const MoreWaypointImg = document.createElement("img");
        MoreWaypointImg.src = "/assets/location.png"
        MoreWaypointImg.alt = "위치아이콘"
        const removeWaypoint = document.createElement("div");
        removeWaypoint.classList.add("removeWaypoint")
        const removeWaypointImg = document.createElement("img");
        removeWaypointImg.src = "/assets/trashbin.png"
        removeWaypointImg.alt = "쓰레기통 아이콘"
        removeWaypointImg.style.height = "auto"
        removeWaypoint.append(removeWaypointImg)
        MoreWaypointDiv.append(MoreWaypointInput, MoreWaypointImg, removeWaypoint)
        WaypointScrollBox.appendChild(MoreWaypointDiv)
        const removeWaypointBtn = document.querySelector(".removeWaypoint")
        // removeWaypointBtn.addEventListener("click", removeWaypointDiv)
        // const removeWaypointBtnAll = document.querySelectorAll(".removeWaypoint")
        // let wayPoinNum = removeWaypointBtnAll.length
        // for (let i = 0; i < wayPoinNum; i++) {
        //     removeWaypointBtnAll[i].addEventListener("click", removeWaypointDivAll)
        // }
    }

    //경유지 삭제
    function removeWaypointDiv() {
        let deletWayPoint = this.parentElement;
        deletWayPoint.remove();
    }
    function removeWaypointDivAll() {
        let deletWayPoint = this.parentElement;
        deletWayPoint.remove();
    }

    //기사님 동행여부 선택
    const secondOrderPageCheckCell = document.querySelectorAll(".secondOrderPageCheckCell")
    const checking = document.querySelectorAll(".checking")
    const beforechecking = document.querySelectorAll(".beforechecking")

    secondOrderPageCheckCell[0].addEventListener("click", checkingWidthDriver)
    function checkingWidthDriver() {
        secondOrderPageCheckCell[1].classList.remove('secondOrderPageCheckCellcheck')
        secondOrderPageCheckCell[0].classList.add('secondOrderPageCheckCellcheck')
        checking[0].classList.remove("displayNone")
        beforechecking[0].classList.add("displayNone")
        checking[1].classList.add("displayNone")
        beforechecking[1].classList.remove("displayNone")
    }
    secondOrderPageCheckCell[1].addEventListener("click", checkingWidthDriverAll)
    function checkingWidthDriverAll() {
        secondOrderPageCheckCell[0].classList.remove('secondOrderPageCheckCellcheck')
        secondOrderPageCheckCell[1].classList.add('secondOrderPageCheckCellcheck')
        checking[1].classList.remove("displayNone")
        beforechecking[1].classList.add("displayNone")
        checking[0].classList.add("displayNone")
        beforechecking[0].classList.remove("displayNone")
    }


    //기사동행여부 선택완료
    const secondOrderPageNextBtn = document.querySelector(".secondOrderPageNextBtn")
    const thirdOrderPage = document.querySelector(".thirdOrderPage")
    const withDriver = document.querySelector("#withDriver")
    const thirdOrderPageNextBtn = document.querySelectorAll(".thirdOrderPageNextBtn")
    let ChoiceToWithDriver = 0;

    secondOrderPageNextBtn.addEventListener("click", finishedSecondOrder);
    function finishedSecondOrder() {
        secondOrderPage.classList.add("displayNone")
        thirdOrderPage.classList.remove("displayNone")
        if (withDriver.checked) {
            ChoiceToWithDriver = 1;
        }
        if (ChoiceToWithDriver == 1) {
            thirdOrderPageNextBtn[1].classList.remove("displayNone")
        } else {
            thirdOrderPageNextBtn[0].classList.remove("displayNone")
        }
    }

    //버스 구하는 목적 체크박스
    const thirdOrderPageCheckingBoxBtn = document.querySelectorAll(".thirdOrderPageCheckingBoxBtn")
    const tripOptionRadio = document.querySelectorAll(".tripOptionRadio")
    const thirdOrderPageOptionBlock = document.querySelectorAll(".thirdOrderPageOptionBlock")
    const itIsReal = document.querySelector(".itIsReal")
    const thirdOrderPageOptonCover = document.querySelector(".thirdOrderPageOptonCover")


    thirdOrderPageCheckingBoxBtn[0].addEventListener("click", openTripOption)
    function openTripOption() {
        itIsReal.classList.remove("displayNone")
        thirdOrderPageOptonCover.classList.remove("displayNone")
    }
    thirdOrderPageCheckingBoxBtn[2].addEventListener("click", closedTripOption)
    function closedTripOption() {
        itIsReal.classList.add("displayNone")
        thirdOrderPageOptonCover.classList.add("displayNone")
        thirdOrderPageCheckingBoxBtn[0].style.backgroundColor = "#b00020"
        thirdOrderPageCheckingBoxBtn[0].style.borderTop = "0.2rem solid white"
        thirdOrderPageCheckingBoxBtn[0].style.color = "white"
        thirdOrderPageCheckingBoxBtn[0].innerText = "다시선택하기"
    }
    for (let i = 0; i < 12; i++) {
        tripOptionRadio[i].addEventListener("change", tripOptionchange);
    }
    function tripOptionchange() {
        for (let i = 0; i < 12; i++) {
            thirdOrderPageOptionBlock[i].style.backgroundColor = "white"
            thirdOrderPageOptionBlock[i].style.color = "black"
        }
        const radio = this.id
        const radioClass = document.querySelector(`.${radio}`)
        radioClass.style.backgroundColor = "#b00020"
        radioClass.style.color = "white"
    }

    //편의시설 추가하는 체크박스
    const itIsReal2 = document.querySelector(".itIsReal2")
    const Facilities = document.querySelectorAll(".Facilities")

    thirdOrderPageCheckingBoxBtn[1].addEventListener("click", openFacilities)
    function openFacilities() {
        itIsReal2.classList.remove("displayNone")
        thirdOrderPageOptonCover.classList.remove("displayNone")
    }
    for (let i = 0; i < 6; i++) {
        Facilities[i].addEventListener("click", changeFacilities)
    }
    function changeFacilities() {
        const checkBox = this.id
        const checkBoxClass = document.querySelector(`.${checkBox}`)
        const checkBoxClassSvg = document.querySelector(`.${checkBox} svg g`)
        if (this.checked) {
            checkBoxClass.style.color = "#b00020"
            checkBoxClass.style.border = "0.1rem solid #b00020"
            checkBoxClassSvg.style.fill = "#b00020"
        } else {
            checkBoxClass.style.color = "grey"
            checkBoxClass.style.border = "0.1rem solid grey"
            checkBoxClassSvg.style.fill = "grey"
        }
    }

    thirdOrderPageCheckingBoxBtn[3].addEventListener("click", closedFacilities)
    function closedFacilities() {
        itIsReal2.classList.add("displayNone")
        thirdOrderPageOptonCover.classList.add("displayNone")
        thirdOrderPageCheckingBoxBtn[1].style.backgroundColor = "#b00020"
        thirdOrderPageCheckingBoxBtn[1].style.borderTop = "0.2rem solid white"
        thirdOrderPageCheckingBoxBtn[1].style.color = "white"
        thirdOrderPageCheckingBoxBtn[1].innerText = "다시선택하기"
    }


    //옵션 선택완료
    const fourthOrderPage = document.querySelector(".fourthOrderPage")
    thirdOrderPageNextBtn[0].addEventListener("click", orderDone)
    function orderDone() {
        thirdOrderPage.classList.add("displayNone")
        fourthOrderPage.classList.remove("displayNone")
    }

});


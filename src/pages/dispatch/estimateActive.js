document.addEventListener("DOMContentLoaded", function () {
  console.log("LOADING")
  // filter
  const visibleFilterBtn = document.querySelector(".visibleFilterBtn")
  const hiddenFilter = document.querySelector(".hiddenFilter")
  visibleFilterBtn.addEventListener("click", openHiddenFilter)
  function openHiddenFilter(){
    hiddenFilter.style.display = "flex"
  }

  const filterSearchBtn = document.querySelector(".filterSearchBtn")
  filterSearchBtn.addEventListener("click", closedfilter)
  function closedfilter(){
    hiddenFilter.style.display = "none"
  }

  // // moreinfo
  // const moreInfoBtn = document.querySelector(".moreInforBtn")
  // const topOrderMoreInfor = document.querySelector(".topOrderMoreInfor")
  // const moreInfoBtnImg = document.querySelector(".moreInforBtn img")
  // moreInfoBtn.addEventListener("click", openMoreInfo);
  // function openMoreInfo(){
  //   console.log("CLICCKCK");
  //   if(topOrderMoreInfor.classList.contains("displayNone")){
  //     topOrderMoreInfor.classList.remove("displayNone")
  //     moreInfoBtnImg.style.transform = "rotate(180deg)"
  //   }else{
  //     topOrderMoreInfor.classList.add("displayNone")
  //     moreInfoBtnImg.style.transform = "rotate(0deg)"
  //   }
  // }

  // // underSideMoreInfo
  // moreInfoBtn.addEventListener("click", underSideOpenMoreInfo);
  // function underSideOpenMoreInfo(){
  //   if(topOrderMoreInfor.classList.contains("displayNone")){
  //     topOrderMoreInfor.style.borderBottom = "none"
  //   }else{
  //     topOrderMoreInfor.style.borderBottom = "0.1rem dashed grey"
  //   }
  // }

  // const moreInforBtn = document.querySelector(".moreInforBtn")
  // let BlockA = 0;
  // moreInforBtn.addEventListener("mouseover", blockToA)
  // function blockToA(){
  //   BlockA = 1;
  // }
  // moreInforBtn.addEventListener("mouseout", useToA)
  // function useToA(){
  //   BlockA = 0;
  // }
  // function preventClick(e){
  //   if(BlockA == 1){
  //     e.preventDefault()
  //   }
  // }

  // create
  // const bothLinkBox = document.querySelectorAll(".bothLinkBox")
  // const orderContainerPlusBtn = document.querySelectorAll(".orderContainerPlusBtn")
  // const createEstimate = document.querySelectorAll(".createEstimate")
  // for (let i = 0; i < bothLinkBox.length; i++) {
  //   bothLinkBox[i].addEventListener("focusin", pickOrder)
  //   bothLinkBox[i].addEventListener("focusout", bulrOrder)
  //   createEstimate[i].addEventListener('mousedown', blockEvent)
  // }
  // function blockEvent(event) {
  //   event.preventDefault()
  // }
  // function pickOrder() {
  //   let createEstimate = this.querySelector(".createEstimate")
  //   this.querySelector(".orderContainerPlusBtn").style.border = "0.2rem solid #001DB0";
  //   this.querySelector(".orderContainerPlusBtn").style.marginBottom = "1rem";
  //   this.style.margin = "-0.1rem 0 10rem -0.1rem";
  //   createEstimate.classList.remove("displayNone")
  // }
  // function bulrOrder() {
  //   let createEstimate = this.querySelector(".createEstimate")
  //   this.querySelector(".orderContainerPlusBtn").style.border = "0.1rem solid #a7a7a7";
  //   this.querySelector(".orderContainerPlusBtn").style.marginBottom = "2rem";
  //   this.style.margin = "0";
  //   createEstimate.classList.add("displayNone")
  // }
})
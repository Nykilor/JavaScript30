const panels = document.querySelectorAll(".panel");

function toggleOpen() {
       const isAnyOpen = document.querySelector(".open");
       if(isAnyOpen !== null) isAnyOpen.classList.toggle("open");
       this.classList.toggle("open");
}
function toggleActive(e) {
    if(e.propertyName.includes("flex")) this.classList.toggle("open-active");
}
panels.forEach(panel => panel.addEventListener("click", toggleOpen));
panels.forEach(panel => panel.addEventListener("transitionend", toggleActive));


document.addEventListener("DOMContentLoaded", () => {

    const themeBtn = document.getElementById("themeBtn");
    const themeLink = document.getElementById("themeStylesheet");

    let isRed = true;

    themeBtn.addEventListener("click", () => {
        themeLink.href = isRed ? "green.css" : "red.css";
        isRed = !isRed;
    });

    const toggleBtn = document.getElementById("toggleBtn");
    const skillsSection = document.getElementById("skillsSection");

    toggleBtn.addEventListener("click", () => {
        skillsSection.style.display =
            skillsSection.style.display === "none" ? "block" : "none";
    });

});
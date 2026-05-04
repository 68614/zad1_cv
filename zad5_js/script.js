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
    const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    document.getElementById("nameError").textContent = "";
    document.getElementById("surnameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";

    if (name === "") {
        document.getElementById("nameError").textContent = "Imię jest wymagane";
        isValid = false;
    }

    if (surname === "") {
        document.getElementById("surnameError").textContent = "Nazwisko jest wymagane";
        isValid = false;
    }

    if (email === "") {
        document.getElementById("emailError").textContent = "Email jest wymagany";
        isValid = false;
    }

    if (message === "") {
        document.getElementById("messageError").textContent = "Wiadomość jest wymagana";
        isValid = false;
    }

    const nameRegex = /^[A-Za-zÀ-ž\s]+$/;

    if (!nameRegex.test(name)) {
        document.getElementById("nameError").textContent = "Imię nie może zawierać cyfr";
        isValid = false;
    }

    if (!nameRegex.test(surname)) {
        document.getElementById("surnameError").textContent = "Nazwisko nie może zawierać cyfr";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Niepoprawny email";
        isValid = false;
    }

    if (isValid) {
        alert("Formularz wysłany poprawnie!");
        form.reset();
    }
});
});
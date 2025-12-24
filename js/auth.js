function register(e) {
    e.preventDefault();

    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);

localStorage.setItem("role", user === "admin" ? "admin" : "user");

    alert("Реєстрація успішно виконана!");
    window.location.href = "login.html";
}

function login(e) {
    e.preventDefault();

    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    if (
        user === localStorage.getItem("user") &&
        pass === localStorage.getItem("pass")
    ) {
        localStorage.setItem("logged", "true");
         localStorage.setItem("username", user);
        alert("Вхід успішно виконано!");
        window.location.href = "index.html";
    } else {
        alert("Невірні дані");
    }
}

function logout() {
    localStorage.removeItem("logged");
    alert("Ви вийшли з системи");
    window.location.href = "login.html";
}

/* 🔴 ВАЖНО: ЖДЁМ, ПОКА СТРАНИЦА ЗАГРУЗИТСЯ */
document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!loginBtn || !logoutBtn) return;

    if (localStorage.getItem("logged") === "true") {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
});

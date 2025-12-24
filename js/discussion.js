const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let discussions = JSON.parse(localStorage.getItem("discussions")) || [];
let discussion = discussions[id];

// Если темы нет — назад
if (!discussion) {
    alert("Тема не знайдена");
    window.location.href = "discussions.html";
}

// Заголовок
document.getElementById("topic").innerText = discussion.title;

// Сохранение
function save() {
    localStorage.setItem("discussions", JSON.stringify(discussions));
}

// Отрисовка сообщений
function render() {
    const box = document.getElementById("messages");
    box.innerHTML = "";

    discussion.messages.forEach((m, index) => {
        const p = document.createElement("p");
        p.innerHTML = `<b>${m.user}:</b> ${m.text}`;

        // Удаление сообщения — только админ
        if (localStorage.getItem("role") === "admin") {
            const btn = document.createElement("button");
            btn.textContent = "❌";
            btn.style.marginLeft = "10px";
            btn.onclick = () => removeMessage(index);
            p.appendChild(btn);
        }

        box.appendChild(p);
    });
}

// Добавить сообщение
function send() {
    const textarea = document.getElementById("text");
    const text = textarea.value.trim();

    if (!text) return;

    discussion.messages.push({
        user: localStorage.getItem("username"),
        text: text
    });

    save();
    textarea.value = "";
    render();
}

// Удаление сообщения
function removeMessage(index) {
    discussion.messages.splice(index, 1);
    save();
    render();
}

// Первый запуск
render();

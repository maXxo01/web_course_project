// Загружаем темы или создаём пустой массив
let discussions = JSON.parse(localStorage.getItem("discussions"));
if (!discussions) {
    discussions = [];
    localStorage.setItem("discussions", JSON.stringify(discussions));
}

// Сохранение
function save() {
    localStorage.setItem("discussions", JSON.stringify(discussions));
}

// Отрисовка списка тем
function render() {
    const list = document.getElementById("discussionList");
    list.innerHTML = "";

    discussions.forEach((d, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <a href="discussion.html?id=${index}">
                ${d.title} (${d.messages.length})
            </a>
        `;

        // Кнопка удаления (только админ)
        if (localStorage.getItem("role") === "admin") {
            const btn = document.createElement("button");
            btn.textContent = "❌";
            btn.style.marginLeft = "10px";
            btn.onclick = () => removeDiscussion(index);
            li.appendChild(btn);
        }

        list.appendChild(li);
    });
}

// Создание новой темы
function createDiscussion() {
    const titleInput = document.getElementById("title");
    const title = titleInput.value.trim();

    if (!title) {
        alert("Введіть назву теми");
        return;
    }

    discussions.push({
        title: title,
        createdBy: localStorage.getItem("username"),
        messages: []
    });

    save();
    titleInput.value = "";
    render();
}

// Удаление темы (админ)
function removeDiscussion(index) {
    if (localStorage.getItem("role") !== "admin") return;

    if (!confirm("Видалити тему разом з усіма повідомленнями?")) return;

    discussions.splice(index, 1);
    save();
    render();
}

// Первый запуск
render();

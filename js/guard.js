document.addEventListener("DOMContentLoaded", () => {
    const protectedPages = [
        "discussions.html",
        "discussion.html"
    ];

    const currentPage = location.pathname.split("/").pop();

    if (
        protectedPages.includes(currentPage) &&
        localStorage.getItem("logged") !== "true"
    ) {
        window.location.href = "login.html";
    }
});

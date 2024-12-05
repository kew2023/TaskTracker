document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("login-screen");
    const taskScreen = document.getElementById("task-screen");

    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const addTaskBtn = document.getElementById("add-task-btn");

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("login-error");

    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");

    // Пользовательские данные для авторизации
    const user = { username: "testuser", password: "password123" };

    // Авторизация
    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === user.username && password === user.password) {
            loginScreen.classList.add("hidden");
            taskScreen.classList.remove("hidden");
            loginError.textContent = "";
        } else {
            loginError.textContent = "Invalid credentials.";
        }
    });

    // Выход
    logoutBtn.addEventListener("click", () => {
        loginScreen.classList.remove("hidden");
        taskScreen.classList.add("hidden");
        usernameInput.value = "";
        passwordInput.value = "";
        taskList.innerHTML = "";
    });

    // Добавление задачи
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement("li");
            taskItem.textContent = taskText;

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-task-btn");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => taskItem.remove());

            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
            taskInput.value = "";
        }
    });
});

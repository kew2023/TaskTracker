const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    try {
        console.log('Начало тестирования...\n');

        // Тест 1: Авторизация с корректными данными
        await page.fill('#username', 'testuser');
        await page.fill('#password', 'password123');
        await page.click('#login-btn');
        const isTaskScreenVisible = await page.isVisible('#task-screen');
        console.log('Тест 1: Авторизация с корректными данными:', isTaskScreenVisible ? 'Успешно' : 'Провал');

        // Вернуться на страницу логина для следующего теста
        await page.goto('http://localhost:3000');

        // Тест 2: Ошибка авторизации с некорректными данными
        await page.fill('#username', 'wronguser');
        await page.fill('#password', 'wrongpassword');
        await page.click('#login-btn');
        const loginError = await page.textContent('#login-error');
        console.log('Тест 2: Ошибка авторизации с некорректными данными:', loginError.includes('Invalid credentials') ? 'Успешно' : 'Провал');

        // Тест 3: Добавление новой задачи
        await page.fill('#username', 'testuser');
        await page.fill('#password', 'password123');
        await page.click('#login-btn');
        await page.fill('#new-task', 'Learn Playwright');
        await page.click('#add-task-btn');

        // Ожидание появления задачи
        await page.waitForSelector('#task-list li', { hasText: 'Learn Playwright' });
        const taskListAfterAdd = await page.textContent('#task-list');
        console.log('Тест 3: Добавление новой задачи:', taskListAfterAdd.includes('Learn Playwright') ? 'Успешно' : 'Провал');

        // Тест 4: Удаление задачи
        await page.fill('#new-task', 'Task to delete');
        await page.click('#add-task-btn');

        // Ожидание появления задачи "Task to delete"
        await page.waitForSelector('#task-list li', { hasText: 'Task to delete' });

        // Убедиться, что задача добавлена
        let taskList = await page.textContent('#task-list');
        if (!taskList.includes('Task to delete')) {
            console.error('Тест 4: Добавление задачи для удаления провалилось.');
        } else {

            // Найти задачу "Task to delete"
            const taskToDelete = await page.locator('#task-list li', { hasText: 'Task to delete' });

            // Ожидание появления кнопки удаления
            await taskToDelete.locator('button.delete-task-btn').waitFor();

            // Клик по кнопке удаления
            await taskToDelete.locator('button.delete-task-btn').click();

            // Ожидание обновления списка задач
            await page.waitForTimeout(500);

            // Проверить, что задача удалена
            const updatedTaskList = await page.textContent('#task-list');
            console.log(
                'Тест 4: Удаление задачи:',
                !updatedTaskList.includes('Task to delete') ? 'Успешно' : 'Провал'
            );
        }


        console.log('\nВсе тесты завершены.');
    } catch (error) {
        console.error('Произошла ошибка во время тестирования:', error);
    } finally {
        await browser.close();
    }
})();

const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    // Тест: Авторизация с корректными данными
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('#login-btn');
    const isTaskScreenVisible = await page.isVisible('#task-screen');

    console.log('Авторизация с корректными данными:', isTaskScreenVisible ? 'Успешно' : 'Провал');

    // Добавьте другие тесты по мере необходимости

    await browser.close();
})();

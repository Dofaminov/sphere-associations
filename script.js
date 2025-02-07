// Функция для чтения содержимого файла spheres.txt
function loadSpheres() {
    return fetch('spheres.txt')
        .then(response => response.text())
        .then(data => data.split('\n').filter(line => line.trim() !== ''));
}

let buttonDisabled = false; // Флаг для отслеживания состояния кнопки

// Функция для показа результата
function showResult(sphere) {
    const resultDiv = document.getElementById('result');
    const sphereName = document.getElementById('sphereName');
    const instruction = document.getElementById('instruction');

    // Показываем результат
    sphereName.textContent = sphere;
    instruction.textContent = 'Назови десять ассоциаций для этой сферы.';
    resultDiv.classList.remove('hidden');

    // Через 20 секунд скрываем результат
    setTimeout(() => {
        resultDiv.classList.add('hidden');
        sphereName.textContent = '';
        instruction.textContent = '';

        // Разблокируем кнопку после 20 секунд
        buttonDisabled = false;
        document.getElementById('sphereButton').disabled = false;
        document.getElementById('sphereButton').classList.remove('button-disabled'); // Удаляем класс
    }, 20000);
}

// Главная функция
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('sphereButton');
    loadSpheres().then(spheres => {
        button.addEventListener('click', () => {
            // Если кнопка заблокирована, игнорируем нажатие
            if (buttonDisabled) return;

            // Блокируем кнопку на 20 секунд
            buttonDisabled = true;
            button.disabled = true;

            // Добавляем класс для изменения цвета
            button.classList.add('button-disabled');

            // Выбираем случайную сферу и показываем её
            const randomSphere = spheres[Math.floor(Math.random() * spheres.length)];
            showResult(randomSphere);
        });
    });
});
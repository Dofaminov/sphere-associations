// Функция для чтения содержимого файла spheres.txt
function loadSpheres() {
    return fetch('spheres.txt')
        .then(response => response.text())
        .then(data => data.split('\n').filter(line => line.trim() !== ''));
}

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
    }, 20000);
}

// Функция для изменения цвета кнопки при нажатии
function changeButtonColor(button) {
    button.style.backgroundColor = '#ef5350'; // Приглушенный лососевый
    setTimeout(() => {
        button.style.backgroundColor = '#7cb342'; // Приглушенный салатовый
    }, 20000);
}

// Главная функция
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('sphereButton');
    loadSpheres().then(spheres => {
        button.addEventListener('click', () => {
            const randomSphere = spheres[Math.floor(Math.random() * spheres.length)];
            showResult(randomSphere);
            changeButtonColor(button);
        });
    });
});
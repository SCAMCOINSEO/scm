document.addEventListener('DOMContentLoaded', () => {
    const scoreValue = document.getElementById('scoreValue');
    const clickerButton = document.getElementById('clickerButton');
    const progressBar = document.getElementById('progressBar');
    const progressStatus = document.getElementById('progressStatus');
    const incomePerHourElement = document.getElementById('incomePerHour');
    const navigateToIncomeButton = document.getElementById('navigateToIncome');

    let score = parseInt(localStorage.getItem('score')) || 0;
    let progress = parseInt(localStorage.getItem('progress')) || 5000;
    let maxProgress = parseInt(localStorage.getItem('maxProgress')) || 5000;
    let clickMultiplier = parseInt(localStorage.getItem('clickMultiplier')) || 1;
    let multiClickerLevel = parseInt(localStorage.getItem('multiClickerLevel')) || 0;
    let barCapacityLevel = parseInt(localStorage.getItem('barCapacityLevel')) || 0;
    let incomePerHour = parseFloat(localStorage.getItem('incomePerHour')) || 0;

    const progressDecreaseRate = clickMultiplier;
    const progressIncreaseRate = 3;

    function updateProgress() {
        const progressPercentage = (progress / maxProgress) * 100;
        progressBar.style.width = progressPercentage + '%';
        progressStatus.textContent = `${progress}/${maxProgress}`;
    }

    function updateScore() {
        scoreValue.textContent = Math.floor(score);
    }

    function updateIncomePerHour() {
        incomePerHourElement.textContent = `Доход в час: ${incomePerHour.toFixed(2)}`;
    }

    function showAnimation(value) {
        const animationText = document.createElement('div');
        animationText.textContent = `+${value}`;
        animationText.classList.add('animation-text');
        document.body.appendChild(animationText);

        const rect = clickerButton.getBoundingClientRect();
        animationText.style.left = `${rect.left + rect.width / 2}px`;
        animationText.style.top = `${rect.top + rect.height / 2}px`;

        setTimeout(() => {
            animationText.remove();
        }, 1000);
    }

    clickerButton.addEventListener('click', () => {
        if (progress > 0) {
            score += clickMultiplier;
            progress -= progressDecreaseRate;
            if (progress < 0) {
                progress = 0;
            }
            updateScore();
            updateProgress();
            localStorage.setItem('score', score);
            localStorage.setItem('progress', progress);
            showAnimation(clickMultiplier);
        }
    });

    navigateToIncomeButton.addEventListener('click', () => {
        navigate('income.html');
    });

    setInterval(() => {
        if (progress < maxProgress) {
            progress += progressIncreaseRate;
            if (progress > maxProgress) {
                progress = maxProgress;
            }
            updateProgress();
            localStorage.setItem('progress', progress);
        }
    }, 1000);

    updateProgress();
    updateScore();
    updateIncomePerHour();
});

function navigate(page) {
    window.location.href = page;
}

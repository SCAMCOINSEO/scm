document.addEventListener('DOMContentLoaded', () => {
    const scoreValue = document.getElementById('scoreValue');
    const stakingAmount = document.getElementById('stakingAmount');
    const stakeButton = document.getElementById('stakeButton');
    const currentProfit = document.getElementById('currentProfit');
    const multiClickerUpgradeButton = document.getElementById('multiClickerUpgrade');
    const barCapacityUpgradeButton = document.getElementById('barCapacityUpgrade');
    const boosterMaxProgress = document.getElementById('boosterMaxProgress');
    const boosterClickMultiplier = document.getElementById('boosterClickMultiplier');

    let score = parseInt(localStorage.getItem('score')) || 0;
    let maxProgress = parseInt(localStorage.getItem('maxProgress')) || 5000;
    let clickMultiplier = parseInt(localStorage.getItem('clickMultiplier')) || 1;
    let multiClickerLevel = parseInt(localStorage.getItem('multiClickerLevel')) || 0;
    let barCapacityLevel = parseInt(localStorage.getItem('barCapacityLevel')) || 0;
    let incomePerHour = parseFloat(localStorage.getItem('incomePerHour')) || 0;
    let lastUpdateTime = parseInt(localStorage.getItem('lastUpdateTime')) || Date.now();
    let stakedAmount = parseFloat(localStorage.getItem('stakedAmount')) || 0;

    // Ensure levels do not exceed 10
    if (multiClickerLevel > 10) multiClickerLevel = 10;
    if (barCapacityLevel > 10) barCapacityLevel = 10;

    const multiClickerBaseCost = 100;
    const barCapacityBaseCost = 200;

    function calculateOfflineEarnings() {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - lastUpdateTime) / 1000 / 60 / 60; // hours
        const earnings = incomePerHour * elapsedTime;
        score += earnings;
        localStorage.setItem('score', score);
        lastUpdateTime = currentTime;
        localStorage.setItem('lastUpdateTime', lastUpdateTime);
        return earnings;
    }

    function updateUpgradeButtons() {
        multiClickerUpgradeButton.textContent = `Прокачать (${multiClickerBaseCost * Math.pow(10, multiClickerLevel)})`;
        barCapacityUpgradeButton.textContent = `Прокачать (${barCapacityBaseCost * Math.pow(10, barCapacityLevel)})`;
        multiClickerUpgradeButton.disabled = multiClickerLevel >= 10;
        barCapacityUpgradeButton.disabled = barCapacityLevel >= 10;
    }

    function updateIncomeDisplay() {
        currentProfit.textContent = incomePerHour.toFixed(2);
        scoreValue.textContent = Math.floor(score);
    }

    function updateIncomePerHour() {
        localStorage.setItem('incomePerHour', incomePerHour);
    }

    function updateScore() {
        localStorage.setItem('score', score);
        scoreValue.textContent = Math.floor(score);
    }

    function showOfflineEarnings() {
        const earnings = calculateOfflineEarnings();
        if (earnings > 0) {
            alert(`Пока вас не было, вы заработали ${Math.floor(earnings)} монет.`);
        }
    }

    stakeButton.addEventListener('click', () => {
        const amountToStake = parseInt(stakingAmount.value);
        if (!isNaN(amountToStake) && amountToStake > 0 && score >= amountToStake) {
            score -= amountToStake;
            stakedAmount += amountToStake;
            incomePerHour = stakedAmount * 0.1;
            localStorage.setItem('stakedAmount', stakedAmount);
            updateIncomePerHour();
            updateScore();
            updateIncomeDisplay();
        }
    });

    multiClickerUpgradeButton.addEventListener('click', () => {
        const upgradeCost = multiClickerBaseCost * Math.pow(10, multiClickerLevel);
        if (score >= upgradeCost && multiClickerLevel < 10) {
            score -= upgradeCost;
            clickMultiplier += 1;
            multiClickerLevel += 1;
            localStorage.setItem('clickMultiplier', clickMultiplier);
            localStorage.setItem('multiClickerLevel', multiClickerLevel);
            updateUpgradeButtons();
            updateScore();
        }
    });

    barCapacityUpgradeButton.addEventListener('click', () => {
        const upgradeCost = barCapacityBaseCost * Math.pow(10, barCapacityLevel);
        if (score >= upgradeCost && barCapacityLevel < 10) {
            score -= upgradeCost;
            maxProgress += 1000;
            barCapacityLevel += 1;
            localStorage.setItem('maxProgress', maxProgress);
            localStorage.setItem('barCapacityLevel', barCapacityLevel);
            updateUpgradeButtons();
            updateScore();
        }
    });

    boosterMaxProgress.addEventListener('click', () => {
        maxProgress = parseInt(localStorage.getItem('maxProgress')) || 5000;
        localStorage.setItem('progress', maxProgress);
    });

    boosterClickMultiplier.addEventListener('click', () => {
        let originalMultiplier = clickMultiplier;
        clickMultiplier *= Math.floor(Math.random() * 4) + 2;
        setTimeout(() => {
            clickMultiplier = originalMultiplier;
            localStorage.setItem('clickMultiplier', clickMultiplier);
        }, 5000);
    });

    setInterval(() => {
        const earnings = (incomePerHour / 3600) * 3; // доход за 3 секунды
        score += earnings;
        updateScore();
    }, 3000);

    updateUpgradeButtons();
    updateIncomeDisplay();
    showOfflineEarnings();
});

function navigate(page) {
    window.location.href = page;
}

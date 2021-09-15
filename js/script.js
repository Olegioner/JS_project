'use strict'

let money,
    time;

function start() {
    money = +prompt("Ваш бюджет на месяц?", '');
    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    //time = prompt("Введите дату в формате YYYY-MM-DD", '');
}

start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true
};

function chooseExpenses() {
    for (let i = 0; i < 2; i++) {
        let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
            b = prompt("Во сколько обойдется?", '');

        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
        } else {
            console.log('bad result');
            i--;
        }
    }
}

function chooseOptExpenses() {
    for (let i = 0; i < 3; i++) {
        let optExpenses = prompt('Статья необязательных расходов?', '');
        appData.optionalExpenses[i + 1] = optExpenses;
    }
}

function detectDayBudget() {
    appData.moneyPerDay = (appData.budget / 30).toFixed(1);
    alert('Ваш ежедневный бюджет = ' + appData.moneyPerDay + 'руб.');
}

function detectLevel() {
    if (appData.moneyPerDay < 100) {
        console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log('Средний уровень достатка');
    } else {
        console.log('да вы богач');
    }
}



function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt('Какова сумма накоплений?', ''),
            persent = +prompt('Под какой процент', '');

        appData.monthIncome = save / 100 / 12 * persent;
        alert('Доход в месяц с вашего депозита:' + (appData.monthIncome).toFixed(1));

    }

}


chooseExpenses();
chooseOptExpenses();
detectDayBudget();
detectLevel();
checkSavings();
console.log(appData);
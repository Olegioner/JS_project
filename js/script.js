'use strict'

let startBtn = document.getElementById('start'),
    stateExpensesBtn = document.getElementsByTagName('button')[0],
    stateOptExpensesBtn = document.getElementsByTagName('button')[1],
    calculateDayBudgetBtn = document.getElementsByTagName('button')[2];

let inputExpenses = document.querySelectorAll('.expenses-item'),
    inputOptExpenses = document.querySelectorAll('.optionalexpenses-item'),
    inputIncome = document.querySelector('.choose-income'),
    checkBoxSavings = document.querySelector('#savings'),
    inputSum = document.querySelector('.choose-sum'),
    inputPercent = document.querySelector('.choose-percent'),
    inputYear = document.querySelector('.year-value'),
    inputMonth = document.querySelector('.month-value'),
    inputDay = document.querySelector('.day-value');

let budgetValue = document.querySelector('.budget-value'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalexpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthsavingsValue = document.querySelector('.monthsavings-value'),
    yearsavingsValue = document.querySelector('.yearsavings-value');


let money,
    time;

startBtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD", '');
    money = +prompt("Ваш бюджет на месяц?", '');

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    appData.timeData = time;
    appData.budget = money;

    budgetValue.textContent = money.toFixed() + ' рублей';
    inputYear.value = new Date(Date.parse(time)).getFullYear();
    inputMonth.value = new Date(Date.parse(time)).getMonth() + 1;
    inputDay.value = new Date(Date.parse(time)).getDate();

    stateExpensesBtn.attributes.removeNamedItem('disabled');
    stateOptExpensesBtn.attributes.removeNamedItem('disabled');
    calculateDayBudgetBtn.attributes.removeNamedItem('disabled');
});

stateExpensesBtn.addEventListener('click', function () {
    let sumExpenses = 0;
    for (let i = 0; i < inputExpenses.length; i++) {
        let a = inputExpenses[i].value,
            b = inputExpenses[++i].value;

        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sumExpenses += +b;
        } else {
            console.log('bad result');
            i--;
        }
    }
    appData.sumExpenses = sumExpenses;
    expensesValue.textContent = sumExpenses.toFixed() + ' рублей';

});
stateOptExpensesBtn.addEventListener('click', function () {
    for (let i = 0; i < inputOptExpenses.length; i++) {
        let optExpenses = inputOptExpenses[i].value;
        appData.optionalExpenses[i] = optExpenses;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

calculateDayBudgetBtn.addEventListener('click', function () {

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - appData.sumExpenses) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay + 'рублей';
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else {
            levelValue.textContent = 'Высокий уровень достатка';
        }
    } else {
        daybudgetValue.textContent = "Произошла ошибка";
    }
});

inputIncome.addEventListener('input', function () {
    let itemsIncome = inputIncome.value;
    appData.income = itemsIncome.split(', ');
    incomeValue.textContent = itemsIncome;
});


checkBoxSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});


inputSum.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +inputSum.value,
            percent = +inputPercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

inputPercent.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +inputSum.value,
            percent = +inputPercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    appAlertItem: function () {
        console.log('Наша программа включает в себя данные:');
        for (let elem in appData) {
            console.log(`${elem} := ${appData[elem]}`);
        }
    }
};
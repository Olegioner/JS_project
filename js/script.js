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
    savings: true,
    chooseExpenses: function () {
        let sumExpenses = 0;
        for (let i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
                b = +prompt("Во сколько обойдется?", '');

            if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
                appData.expenses[a] = b;
                sumExpenses = sumExpenses + b;
            } else {
                console.log('bad result');
                i--;
            }
        }
        appData.sumExpenses = sumExpenses;

    },
    chooseOptExpenses: function () {
        for (let i = 0; i < 3; i++) {
            let optExpenses = prompt('Статья необязательных расходов?', '');
            appData.optionalExpenses[i] = optExpenses;
        }
    },
    detectDayBudget: function () {
        appData.moneyPerDay = ((appData.budget - appData.sumExpenses) / 30).toFixed(1);
        alert('Ваш ежедневный бюджет = ' + appData.moneyPerDay + 'руб.');

    },
    detectLevel: function () {
        if (appData.moneyPerDay < 100) {
            console.log('Минимальный уровень достатка');
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
        } else {
            console.log('да вы богач');
        }
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save = +prompt('Какова сумма накоплений?', ''),
                persent = +prompt('Под какой процент', '');

            appData.monthIncome = save / 100 / 12 * persent;
            alert('Доход в месяц с вашего депозита:' + (appData.monthIncome).toFixed(1));

        }

    },
    chooseIncome: function () {
        for (let i = 0; i < 1; i++) {
            let items = prompt('Что принесет дополнительный доход? (Через запятую)', '');
            if ((typeof (items)) === 'string' && (typeof (items)) != null && items != '' && items.length < 50) {
                appData.income = items.split(', ');
                //appData.income.push(prompt('Может что то еще?', ' '));
                appData.income.sort();
            } else {
                alert('Не верный формат');
                i--;
            }
        }
        console.log('Способы доп. заработка: ');
        appData.income.forEach(function (elem, index) {
            console.log(`${index+1} - ${elem}`);
        });
    },
    appAlertItem: function () {
        console.log('Наша программа включает в себя данные:');
        for (let elem in appData) {
            console.log(`${elem} := ${appData[elem]}`);
        }
    }
};



appData.chooseExpenses();
appData.chooseOptExpenses();
appData.detectDayBudget();
appData.detectLevel();
appData.checkSavings();
appData.chooseIncome();
appData.appAlertItem();
console.log(appData);
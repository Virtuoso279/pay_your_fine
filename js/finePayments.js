"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;


/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */

function payFine() {
    let fineNumberValue = fineNumber.value;
    let amountValue = parseFloat(amount.value);
    let passportValue = passport.value;
    let creditCardNumberValue = creditCardNumber.value;
    let cvvValue = cvv.value;

    let fineMatch = DB.find(fine => fine.fineNumber === fineNumberValue && fine.amount === amountValue);

    // Check for fine number and amount match
    if (!fineMatch) {
        if (!DB.some(fine => fine.fineNumber === fineNumberValue)) {
            console.log("Номер не співпадає");
        } else {
            console.log("Сума не співпадає");
        }
        return;
    }

    // Validate passport
    if (!/^[а-яА-Я]{2}\d{6}$/.test(passportValue)) {
        console.log("Не вірний паспортний номер");
        return;
    }

    // Validate credit card number
    if (!/^\d{16}$/.test(creditCardNumberValue)) {
        console.log("Не вірна кредитна картка");
        return;
    }

    // Validate CVV
    if (!/^\d{3}$/.test(cvvValue)) {
        console.log("Не вірний cvv");
        return;
    }

    // If all validations pass, remove the fine from the database
    DB = DB.filter(fine => fine !== fineMatch);
    console.log("Оплата успішно проведена");

}

buttonSubmit.addEventListener('click', payFine);

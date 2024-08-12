const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            calculatorScreen.value = '';
            return;
        }

        if (value === '=') {
            if (previousInput && currentInput && operator) {
                currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
                calculatorScreen.value = currentInput;
                operator = '';
                previousInput = '';
            }
            return;
        }

        if (button.classList.contains('operator')) {
            if (currentInput && !previousInput) {
                previousInput = currentInput;
                operator = value;
                currentInput = '';
                calculatorScreen.value = previousInput + ' ' + operator;
            }
            return;
        }

        currentInput += value;
        calculatorScreen.value = previousInput + ' ' + operator + ' ' + currentInput;
    });
});

const burgerIcon = document.querySelector('.burger__menu');
const headerLogo = document.querySelector('.logo');
const navigationMenu = document.querySelector('.navigation__list');
const navigationItems = document.querySelectorAll('.navigation__list-item');
const overlay = document.createElement('div');
overlay.classList.add('overlay');

function open() {
	navigationMenu.classList.remove('hide');
	navigationMenu.classList.add('show');
	headerLogo.classList.add('header__logo-burger');
	burgerIcon.classList.add('active');
	document.body.prepend(overlay);
}

function close() {
	navigationMenu.classList.remove('show');
	navigationMenu.classList.add('hide');
	headerLogo.classList.remove('header__logo-burger');
	burgerIcon.classList.remove('active');
	overlay.remove();
}

burgerIcon.addEventListener('click', () => {
	navigationMenu.classList.contains('show') ? close() : open();
});

overlay.addEventListener('click', close);

const paySlider = document.querySelector('.pay__slider');
const amountValues = document.querySelectorAll('.pay__label');
const amountInputs = document.querySelectorAll('.pay__input');
const amountValuesArray = Array.from(amountValues);
const amountInputsArray = Array.from(amountInputs);
const inputAmount = document.querySelector('.animal__donate-amount');

inputAmount.addEventListener('input', (e) => {
	const value = +inputAmount.value;
	const maxValue = 9999;
	if (inputAmount.value.length > 4) {
		inputAmount.value = inputAmount.value.slice(0, 4);
	}
	if (value > maxValue) {
		inputAmount.value = maxValue;
	}

	checkAmount();
});

paySlider.addEventListener('click', (e) => {
	const activeAmount = e.target.dataset.payAmount.slice(1);
	inputAmount.value = activeAmount;
});

function setInitialAmount() {
	const activeElement = amountInputsArray.find((elem) => elem.id === '6');
	activeElement.setAttribute('checked', 'true');
}

setInitialAmount();

function checkAmount() {
	if (
		amountValuesArray.find(
			(elem) => elem.dataset.payAmount.slice(1) === inputAmount.value
		)
	) {
		const amount = amountValuesArray.find(
			(elem) => elem.dataset.payAmount.slice(1) === inputAmount.value
		);
		const input = amountInputsArray.find((elem) => elem.id === amount.htmlFor);
		input.setAttribute('checked', 'true');
	} else if (
		amountValuesArray.find(
			(elem) => elem.dataset.payAmount.slice(1) !== inputAmount.value
		)
	) {
		amountInputsArray.forEach((elem) =>
			elem.removeAttribute('checked', 'true')
		);
	}
}

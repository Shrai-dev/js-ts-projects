const animalArray = [
	{
		id: 1,
		name: 'giant Pandas',
		img: '../../assets/images/pets-panda.png',
		location: 'Native to Southwest China',
		mealIcon: '../../assets/icons/pets-banana-bamboo_icon.svg',
	},
	{
		id: 2,
		name: 'Eagles',
		img: '../../assets/images/pets-eagle.png',
		location: 'Native to South America',
		mealIcon: '../../assets/icons/pets-meat-fish_icon.svg',
	},
	{
		id: 3,
		name: 'Gorillas',
		img: '../../assets/images/pets-gorilla.png',
		location: 'Native to Congo',
		mealIcon: '../../assets/icons/pets-banana-bamboo_icon.svg',
	},
	{
		id: 4,
		name: 'Two-toed Sloth',
		img: '../../assets/images/pets-sloth.png',
		location: 'Mesoamerica, South America',
		mealIcon: '../../assets/icons/pets-banana-bamboo_icon.svg',
	},
	{
		id: 5,
		name: 'cheetahs',
		img: '../../assets/images/pets-cheetah.png',
		location: 'Native to Africa',
		mealIcon: '../../assets/icons/pets-meat-fish_icon.svg',
	},
	{
		id: 6,
		name: 'Penguins',
		img: '../../assets/images/pets-penguin.png',
		location: 'Native to Antarctica',
		mealIcon: '../../assets/icons/pets-meat-fish_icon.svg',
	},
	{
		id: 7,
		name: 'Alligators',
		img: '../../assets/images/pets-alligator.png',
		location: 'Native to Southeastern U. S.',
		mealIcon: '../../assets/icons/pets-meat-fish_icon.svg',
	},
	{
		id: 8,
		name: 'Koalas',
		img: '../../assets/images/pets-koala.png',
		location: 'Native to Australia',
		mealIcon: '../../assets/icons/pets-banana-bamboo_icon.svg',
	},
];

const burgerIcon = document.querySelector('.burger__menu');
const headerLogo = document.querySelector('.logo');
const navigationMenu = document.querySelector('.navigation__list');
const navigationItems = document.querySelectorAll('.navigation__list-item');
const overlay = document.createElement('div');
overlay.classList.add('overlay');

const petsContainer = document.querySelector('.pets__cards');
const prevPetsPage = document.querySelector('.prev-btn');
const nextPetsPage = document.querySelector('.next-btn');

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

let petsData = [...animalArray];
let fullAnimalList = [];

function createPets() {
	fullAnimalList = (() => {
		let tempArr = [];

		for (let i = 0; i < 6; i++) {
			const newPets = petsData;

			for (let j = newPets.length; j > 0; j--) {
				let randInd = Math.floor(Math.random() * j);
				const randElem = petsData.splice(randInd, 1)[0];
				newPets.push(randElem);
			}

			tempArr = [...tempArr, ...newPets];
		}
		return tempArr;
	})();
	fullAnimalList = sortPetsList(fullAnimalList);

	createPetsCards(fullAnimalList);
}
createPets();

function createPetsCards(list) {
	petsContainer.innerHTML += createElements(list);
}

function createElements(petsList) {
	let str = '';
	for (let i = 0; i < petsList.length; i++) {
		str += `
		        <div class="pets__card" data-id="${petsList[i].id}">
		          <div class="image__wrapper">
		          	<img class="pets__card-image" src="${petsList[i].img}" alt="${petsList[i].name}">
		          </div>
		          <div class="pets__card-content">
		          	<h5 class="pets__card-title">
		          	${petsList[i].name}
		          	</h5>
		          	<p class="pets__card-desc">
		          	${petsList[i].location}
		          	</p>
		          	<img class="pets__card-icon banana-icon" src="${petsList[i].mealIcon}" alt="">
		          </div>
		        </div>
						`;
	}

	return str;
}

function sortPetsList(list) {
	let unique8List = [];
	let length = list.length;
	for (let i = 0; i < length / 8; i++) {
		const uniqueStepList = [];
		for (j = 0; j < list.length; j++) {
			if (uniqueStepList.length >= 8) {
				break;
			}
			const isUnique = !uniqueStepList.some((item) => {
				return item.name === list[j].name;
			});
			if (isUnique) {
				uniqueStepList.push(list[j]);
				list.splice(j, 1);
				j--;
			}
		}
		unique8List = [...unique8List, ...uniqueStepList];
	}
	list = unique8List;
	list = sortRecursivelyPetsList(list);
	return list;
}

function sortRecursivelyPetsList(list) {
	const length = list.length;
	for (let i = 0; i < length / 6; i++) {
		const stepList = list.slice(i * 6, i * 6 + 6);
		for (let j = 0; j < 6; j++) {
			const duplicatedItem = stepList.find((item, ind) => {
				return item.name === stepList[j].name && ind !== j;
			});
			if (duplicatedItem !== undefined) {
				const ind = i * 6 + j;
				const which8OfList = Math.trunc(ind / 8);
				list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);
				sortRecursivelyPetsList(list);
			}
		}
	}
	return list;
}

let currentPage = 0;
let petsContainerHeight;

function calculatePetsContainerHeight() {
	if (document.body.clientWidth > 1400) {
		petsContainerHeight = 892;
	} else if (
		document.body.clientWidth > 999 &&
		document.body.clientWidth < 1401
	) {
		petsContainerHeight = 890;
	} else if (
		document.body.clientWidth > 625 &&
		document.body.clientWidth < 1000
	) {
		petsContainerHeight = 844;
	}
}

prevPetsPage.addEventListener('click', () => {
	currentPage--;
	calculatePetsContainerHeight();
	petsContainer.style.top = `calc(0px - ${
		petsContainerHeight * Math.abs(currentPage)
	}px)`;
	createPets();
});

nextPetsPage.addEventListener('click', () => {
	currentPage++;
	calculatePetsContainerHeight();
	petsContainer.style.top = `calc(0px - ${
		petsContainerHeight * Math.abs(currentPage)
	}px)`;
	createPets();
});

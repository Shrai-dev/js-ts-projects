import DrawHTML from './drawHTML';
import { saveWinner, getWinners } from './operateWinner';
import { renderWinners, renderGarage } from './renderViews';
import { generateRandomCars } from './helpers';
import { Store, Car, WinnersView } from './interfaces';
import { paginate } from './pagination';
import { updateStateGarage, updateStateWinners } from './handleState';
import { startDriving, stopDriving, getCar, createCar, getCars, deleteCar, updateCar } from './operateCar';
import { BASE_URL, GARAGE_URL, ENGINE_URL, WINNERS_URL } from './constants';

export default class Buttons {
  targets: string[];
  store: Store;
  draw: DrawHTML;
  selectedCar: Car;
  base: string;
  garage: string;
  engine: string;
  winners: string;
  classTargets: string;
  clicked: NodeListOf<Element>;
  onEvent: (e: MouseEvent) => Promise<void>;

  constructor(target: string[], st: Store) {
    this.targets = target;
    this.store = <Store>{ ...st };

    this.draw = new DrawHTML(this.store);
    this.selectedCar = <Car>{};
    this.base = BASE_URL;
    this.garage = GARAGE_URL;
    this.engine = ENGINE_URL;
    this.winners = WINNERS_URL;
    this.onEvent = (e: MouseEvent) => this.dispApi(e);
    this.classTargets = this.targets.map((el) => `.${el}`).join(', ');
    this.clicked = document.querySelectorAll(this.classTargets);
  }

  setEvents() {
    [...this.clicked].map((el) => (<HTMLElement>el).addEventListener('click', this.onEvent));
  }

  setEventsSubmit() {
    (<HTMLElement>document.getElementById('update')).addEventListener('submit', (e: Event) =>
      this.dispApi(<MouseEvent>e)
    );
    (<HTMLElement>document.getElementById('create')).addEventListener('submit', (e: Event) =>
      this.dispApi(<MouseEvent>e)
    );
  }

  async dispApi(event: MouseEvent) {
    if (event.type === 'click') {
      const curTargetType = this.targets.filter((el) => (<HTMLElement>event.target).classList.contains(el))[0];
      switch (curTargetType) {
        case 'start-engine-button': {
          const id = +(<HTMLElement>event.target).id.split('start-engine-car-')[1];
          await startDriving(id);
          break;
        }
        case 'stop-engine-button': {
          const id = +(<HTMLElement>event.target).id.split('stop-engine-car-')[1];
          await stopDriving(id);
          break;
        }
        case 'select-button': {
          this.selectedCar = (await getCar(+(<HTMLElement>event.target).id.split('select-cars')[1]))[0];
          (<HTMLInputElement>document.getElementById('update-name')).value = this.selectedCar.name;
          (<HTMLInputElement>document.getElementById('update-color')).value = this.selectedCar.color;
          (<HTMLInputElement>document.getElementById('update-name')).disabled = false;
          (<HTMLInputElement>document.getElementById('update-color')).disabled = false;
          (<HTMLInputElement>document.querySelector('#update>button')).disabled = false;
          break;
        }
        case 'remove-button': {
          const id = +(<HTMLElement>event.target).id.split('remove-cars')[1];
          await deleteCar(id);
          await updateStateGarage(this.store);
          (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage(this.store);
          break;
        }

        case 'generator-button': {
          (<HTMLInputElement>event.target).disabled = true;
          const cars = generateRandomCars();
          await Promise.all(cars.map(async (c) => await createCar(c)));
          await updateStateGarage(this.store);
          const { items, count } = await getCars(1);
          this.store.cars = items;
          this.store.carsCount = +(<string>count);
          (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage(this.store);
          (<HTMLInputElement>event.target).disabled = false;
          break;
        }
        case 'race-button': {
          (<HTMLInputElement>event.target).disabled = true;

          this.store.isRace = true;
          [...this.clicked].map((el) => ((<HTMLInputElement>el).disabled = true));
          [...document.querySelectorAll('button[type="submit"]')].map((el) => ((<HTMLInputElement>el).disabled = true));
          (<HTMLInputElement>document.querySelector('.garage-menu-button')).disabled = false;
          (<HTMLInputElement>document.querySelector('.winners-menu-button')).disabled = false;
          const scars = this.store.cars;
          const proms = scars.map((car: Car) => startDriving(+car.id));
          const resps = await Promise.all(proms);
          const res = await Promise.all(resps.map((resp) => resp));
          const win = res.filter((el) => el.status === 200).sort((a, b) => a.time - b.time)[0];

          await saveWinner(win);
          await getWinners(1, 10, '', '');
          await updateStateWinners(this.store, this.winners);
          renderWinners(this.store);
          [...this.clicked].map((el) => ((<HTMLInputElement>el).disabled = true));
          const message = document.getElementById('message');
          const namewin = this.store.cars.filter((el) => +el.id === win.id)[0].name;
          (<HTMLElement>message).innerHTML = `${namewin} went first (${win.time}s)!`;
          (<HTMLElement>message).classList.add('visible');
          (<HTMLInputElement>document.querySelector('.reset-button')).disabled = false;
          (<HTMLInputElement>document.querySelector('.garage-menu-button')).disabled = false;
          (<HTMLInputElement>document.querySelector('.winners-menu-button')).disabled = false;
          break;
        }
        case 'reset-button': {
          (<HTMLInputElement>event.target).disabled = true;
          this.store.cars.map(({ id }) => stopDriving(+id));
          const message = document.getElementById('message');
          (<HTMLElement>message).innerHTML = '';
          (<HTMLElement>message).classList.remove('visible');
          (<HTMLInputElement>document.getElementById('race')).disabled = false;
          (<HTMLInputElement>event.target).disabled = false;
          [...this.clicked].map((el) => ((<HTMLInputElement>el).disabled = false));
          [...document.querySelectorAll('.stop-engine-button')].map((el) => ((<HTMLInputElement>el).disabled = true));
          [...document.querySelectorAll('button[type="submit"]')].map(
            (el) => ((<HTMLInputElement>el).disabled = false)
          );
          this.store.isRace = false;
          paginate(this.store);
          break;
        }
        case 'prev-button': {
          if (this.store.view === 'garage') {
            this.store.carsPage -= 1;
            await updateStateGarage(this.store);
            (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage(this.store);
          } else if (this.store.view === 'winners') {
            this.store.winnersPage -= 1;
            await updateStateWinners(this.store, this.winners);
            (<HTMLElement>document.getElementById('winners-view')).innerHTML = renderWinners(this.store);
          }
          break;
        }
        case 'next-button': {
          switch (this.store.view) {
            case 'garage': {
              this.store.carsPage += 1;
              await updateStateGarage(this.store);
              (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage(this.store);
              break;
            }
            case 'winners': {
              this.store.winnersPage += 1;
              await updateStateWinners(this.store, this.winners);
              (<HTMLElement>document.getElementById('winners-view')).innerHTML = renderWinners(this.store);
              break;
            }
          }
          break;
        }
        case 'garage-menu-button': {
          this.store.view = 'garage';
          (<HTMLElement>document.getElementById('garage-view')).style.order = '-1';
          (<HTMLElement>document.getElementById('winners-view')).style.order = '';
          paginate(this.store);
          (<HTMLElement>document.querySelector('.message-wrap')).style.display = 'block';
          break;
        }
        case 'winners-menu-button': {
          this.store.view = 'winners';
          paginate(this.store);
          (<HTMLElement>document.querySelector('.message-wrap')).style.display = 'none';
          (<HTMLElement>document.getElementById('garage-view')).style.order = '';
          (<HTMLElement>document.getElementById('winners-view')).style.order = '-1';
          await updateStateWinners(this.store, this.winners);
          (<HTMLElement>document.getElementById('winners-view')).innerHTML = renderWinners(this.store);
          break;
        }
        case 'table-wins': {
          this.store.sortBy = 'wins';
          this.store.sortOrder = this.store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
          const { items, count } = await getWinners(
            this.store.winnersPage,
            this.store.limit,
            this.store.sortBy,
            this.store.sortOrder
          );
          this.store.winners = <WinnersView>(<unknown>items);
          this.store.winnersCount = +(<string>count);
          const renwin = renderWinners(this.store);
          (<HTMLElement>document.getElementById('winners-view')).innerHTML = '';
          (<HTMLElement>document.getElementById('winners-view')).innerHTML = renwin;
          break;
        }
        case 'table-time': {
          this.store.sortBy = 'time';
          this.store.sortOrder = this.store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
          const { items, count } = await getWinners(
            this.store.winnersPage,
            this.store.limit,
            this.store.sortBy,
            this.store.sortOrder
          );
          this.store.winners = <WinnersView>(<unknown>items);
          this.store.winnersCount = +(<string>count);
          const renwin = renderWinners(this.store);
          (<HTMLElement>document.getElementById('winners-view')).innerHTML = '';
          (<HTMLElement>document.getElementById('winners-view')).innerHTML = renwin;
          break;
        }
        default:
          break;
      }
    } else if (event.type === 'submit') {
      const curTargetType = (<HTMLElement>event.target).id;
      switch (curTargetType) {
        case 'create': {
          event.preventDefault();
          const events = <HTMLFormElement>event.target;
          const car = Object.fromEntries(
            new Map(
              [...events]
                .filter((el) => !!(<HTMLInputElement>el).name)
                .map((item) => [(<HTMLInputElement>item).name, (<HTMLInputElement>item).value])
            )
          );
          await createCar(car);
          await updateStateGarage(this.store);
          (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage(this.store);
          (<HTMLInputElement>document.getElementById('create-name')).value = '';
          break;
        }
        case 'update': {
          event.preventDefault();
          const events = <HTMLFormElement>event.target;
          const car = Object.fromEntries(
            new Map(
              [...events]
                .filter((el) => !!(<HTMLInputElement>el).name)
                .map((item) => [(<HTMLInputElement>item).name, (<HTMLInputElement>item).value])
            )
          );
          await updateCar(+this.selectedCar.id, car);
          await updateStateGarage(this.store);
          (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage(this.store);
          (<HTMLInputElement>document.getElementById('update-name')).value = '';
          (<HTMLInputElement>document.getElementById('update-name')).disabled = true;
          (<HTMLInputElement>document.getElementById('update-color')).disabled = true;
          (<HTMLInputElement>document.querySelector('#update>button')).disabled = true;
          (<HTMLInputElement>document.getElementById('update-color')).value = '#ffffff';
          this.selectedCar = <Car>{};
          break;
        }
        default:
          break;
      }
    }
    paginate(this.store);
    this.clicked = document.querySelectorAll(this.classTargets);
    [...this.clicked].map((el) => (<HTMLElement>el).removeEventListener('click', this.onEvent));
    [...this.clicked].map((el) => (<HTMLElement>el).addEventListener('click', this.onEvent));
  }
}

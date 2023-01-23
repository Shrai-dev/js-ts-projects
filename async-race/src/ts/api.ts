import Buttons from './operateButtons';
import { getWinners } from './operateWinner';
import { Store, WinnersView } from './interfaces';
import { getCars } from './operateCar';
import { BASE_URL, GARAGE_URL, ENGINE_URL, WINNERS_URL } from './constants';

export default class Api {
  store: Store;

  base: string;

  garage: string;

  winners: string;

  parents: null;

  dispatch: Buttons;

  targets: string[];

  req: string;

  engine: string;

  constructor(st: Store) {
    this.store = { ...st };
    this.base = BASE_URL;
    this.garage = GARAGE_URL;
    this.engine = ENGINE_URL;
    this.winners = WINNERS_URL;
    this.parents = null;
    this.targets = [
      'start-engine-button',
      'stop-engine-button',
      'select-button',
      'remove-button',
      'generator-button',
      'race-button',
      'reset-button',
      'prev-button',
      'next-button',
      'garage-menu-button',
      'winners-menu-button',
      'table-wins',
      'table-time',
    ];
    this.dispatch = new Buttons(this.targets, this.store);
    this.req = '';
  }

  async getApi(req: string) {
    this.req = req;

    switch (req) {
      case 'getAppCars': {
        const { items, count } = await getCars(1); /* first setting */
        this.store.cars = items;
        this.store.carsCount = +(<string>count);

        return this.store;
      }
      case 'getAppWinners': {
        const { items, count } = await getWinners(1, '', '', 10);
        this.store.winners = <WinnersView>(<unknown>items);
        this.store.winnersCount = +(<string>count);
        return this.store;
      }
      case 'getWinners': {
        const { items, count } = await getWinners(1, '', '', 10);
        this.store.winners = <WinnersView>(<unknown>items);
        this.store.winnersCount = +(<string>count);
        break;
      }
      default:
        break;
    }
  }
}

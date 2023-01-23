import Api from './api';
import Buttons from './operateButtons';
import DrawHTML from './drawHTML';
import { Store } from './interfaces';
import { initialStore } from './store';
import { paginate } from './pagination';
import { updateStateGarage } from './handleState';

class App {
  store: Store;

  api: Api;

  parents: null;

  draws: DrawHTML;

  targets: string[];

  dispatch: Buttons;

  constructor() {
    this.store = initialStore;
    this.api = new Api(this.store);
    this.draws = new DrawHTML(this.store);
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
  }

  async start() {
    const storeCars = await this.api.getApi('getAppCars');
    if (storeCars) {
      this.store.cars = storeCars.cars;
      this.store.carsCount = storeCars.carsCount;
    }

    await this.api.getApi('getAppWinners');

    this.draws = new DrawHTML(this.store);
    await this.draws.render(this.store);
    await updateStateGarage(this.store);
    paginate(this.store);

    this.dispatch = new Buttons(this.targets, this.store);

    this.dispatch.setEvents();
    this.dispatch.setEventsSubmit();
  }
}

export default App;

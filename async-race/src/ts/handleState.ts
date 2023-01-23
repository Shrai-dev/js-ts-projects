import { getWinners } from './operateWinner';
import { Store, WinnersView } from './interfaces';
import { getCars } from './operateCar';

export const updateStateGarage = async (store: Store) => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = +(<string>count);
  (<HTMLInputElement>document.getElementById('next')).disabled = !(store.carsPage * 7 < store.carsCount);
  (<HTMLInputElement>document.getElementById('prev')).disabled = !(store.carsPage > 1);
};
// eslint-disable-next-line  no-unused-vars
export const updateStateWinners = async (store: Store, win: String) => {
  const { items, count } = await getWinners(store.winnersPage, store.sortBy, store.sortOrder, store.limit);
  store.winners = <WinnersView>(<unknown>items);
  store.winnersCount = +(<string>count);
  (<HTMLInputElement>document.getElementById('next')).disabled = !(store.winnersPage * 10 < store.winnersCount);
  (<HTMLInputElement>document.getElementById('prev')).disabled = !(store.winnersPage > 1);
};

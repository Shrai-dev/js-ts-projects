import { Store } from './interfaces';

export const paginate = (store: Store) => {
  if (!store.isRace) {
    const countOnPage = store.view === 'garage' ? 7 : store.limit;
    const countItems = store.view === 'garage' ? store.carsCount : store.winnersCount;
    const pageNum = store.view === 'garage' ? store.carsPage : store.winnersPage;
    (<HTMLInputElement>document.getElementById('next')).disabled = !(pageNum * countOnPage < countItems);
    (<HTMLInputElement>document.getElementById('prev')).disabled = !(pageNum > 1);
  }
};

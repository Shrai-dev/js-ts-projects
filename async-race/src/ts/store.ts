import { WinnersView } from './interfaces';

export const store = {
  carsPage: 1,
  cars: [],
  carsCount: 0,
  winnersPage: 1,
  animation: {},
  winners: <WinnersView>(<unknown>[]),
  winnersCount: 0,
  view: 'garage',
  sortBy: 'id',
  sortOrder: 'ASC',
  limit: 10,
  isRace: false,
};

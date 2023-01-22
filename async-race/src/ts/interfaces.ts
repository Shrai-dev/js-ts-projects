export interface Car {
  id: string;
  name: string;
  color: string;
}

export interface Cars {
  cars: Car[];
}

export interface Winner {
  id: number;
  wins?: number;
  time: number;
}

export interface Winners {
  cars: Winner[];
}

export interface WinnersView {
  id: string;
  wins: number;
  time: number;
  car: Car[];
}

export interface Store {
  carsPage: number;
  cars: Car[];
  carsCount: number;
  winnersPage: number;
  animation: {};
  winners: WinnersView;
  winnersCount: number;
  view: string;
  sortBy: string;
  sortOrder: string;
  limit: number;
  isRace: boolean;
}

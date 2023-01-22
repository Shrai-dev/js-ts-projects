import { Winner } from './interfaces';
import { getCar } from './operateCar';
import { WINNERS_URL } from './url';

export const getWinners = async (page: number, limit = 10, srt: string, ord: string) => {
  const response = await fetch(`${WINNERS_URL}?_page=${page}&_limit=${limit}${getSortOrder(srt, ord)}`, {
    method: 'GET',
  }).catch();
  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: { id: number }) => ({ ...winner, car: await getCar(winner.id) }))
    ),
    count: response.headers.get('X-Total-Count'),
  };
};

export const deleteWinner = async (winners: string, id: number) =>
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
export const getWinnerStatus = async (id: number) => (await fetch(`${WINNERS_URL}/${id}`)).status;
export const getWinner = async (id: number) => (await fetch(`${WINNERS_URL}/${id}`)).json();
export const createWinner = async (body: Winner) =>
  (
    await fetch(WINNERS_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const updateWinner = async (id: number, body: Winner) =>
  (
    await fetch(`${WINNERS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinner = async ({ id, time }: Winner) => {
  const winnerStatus = await getWinnerStatus(id);
  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time: +(+time / 1000).toFixed(3),
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: +(+time / 1000).toFixed(3) < +winner.time ? +(+time / 1000).toFixed(3) : +winner.time,
    });
  }
};

const getSortOrder = (sort: string, order: string) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const racer = async (
  eng: string,
  st: { cars: number[] },
  action: (arg0: any, arg1: number) => Promise<string[]>
) => {
  const promises = await st.cars.map((id: number) => action(eng, id));

  return promises;
};

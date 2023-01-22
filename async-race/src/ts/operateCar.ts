import { GARAGE_URL, ENGINE_URL } from './url';

export const createCar = async (body: { [k: string]: string }) =>
  (
    await fetch(GARAGE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const getCars = async (page: number, limit = 7) => {
  const res = await fetch(`${GARAGE_URL}?_page=${page}&_limit=${limit}`);

  return {
    items: await res.json(),
    count: res.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number) => {
  const res = (await fetch(`${GARAGE_URL}/?id=${id}`)).json();
  return res;
};

export const updateCar = async (id: number, body: { [k: string]: string }) =>
  (
    await fetch(`${GARAGE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const drive = async (engin: string, id: number) => {
  const res = await fetch(`${engin}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

export const startDriving = async (id: number) => {
  const startButton = <HTMLInputElement>document.getElementById(`start-engine-car-${id}`);
  startButton.disabled = true;
  startButton.classList.toggle('enabling', true);

  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);

  startButton.classList.toggle('enabling', false);
  (<HTMLInputElement>document.getElementById(`stop-engine-car-${id}`)).disabled = false;

  const car = <HTMLElement>document.getElementById(`car-${id}`);

  car.style.animationDuration = `${(time / 1000).toFixed(2)}s`;
  car.classList.add('drive');
  const res = await fetch(`${ENGINE_URL}?id=${id}&status=drive`, { method: 'PATCH' });
  const status = res.status;
  if (res.status !== 200) {
    car.classList.add('crash');
  }
  return { status, id, time };
};

export const stopDriving = async (id: number) => {
  const stopButton = <HTMLInputElement>document.getElementById(`stop-engine-car-${id}`);
  stopButton.disabled = true;
  stopButton.classList.toggle('enabling', true);
  await stopEngine(id);
  stopButton.classList.toggle('enabling', false);
  (<HTMLInputElement>document.getElementById(`start-engine-car-${id}`)).disabled = false;
  const car = <HTMLElement>document.getElementById(`car-${id}`);
  car.classList.remove('crash');
  car.classList.remove('drive');
  car.style.animationPlayState = 'initial';
};

export const startEngine = async (id: number) =>
  (await fetch(`${ENGINE_URL}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopEngine = async (id: number) =>
  await fetch(`${ENGINE_URL}?id=${id}?status=stopped`, { method: 'PATCH' });

export const deleteCar = async (id: number) => (await fetch(`${GARAGE_URL}/${id}`, { method: 'DELETE' })).json();

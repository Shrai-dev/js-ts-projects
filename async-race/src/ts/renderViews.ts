import { Car, Store, WinnersView } from './interfaces';

export const renderGarage = (st: Store) => `
  <h2 class='title'>Garage (${String(st.carsCount)})</h2>
  <h3 class='subtitle'>Page #${String(st.carsPage)}</h3>
  <ul class="garage">
    ${st.cars
      .map(
        (car) => `
      <li>${renderCar(car, false)}</li>
    `
      )
      .join('')}
  </ul>
`;

export const renderCar = ({ id, name, color }: Car, isEngineStarted: boolean) => `
  <div class="general-buttons">
    <button class="button select-button" id="select-cars${id}">Select</button>
    <button class="button remove-button" id="remove-cars${id}">Remove</button>
    <span class="car-name">${name}</span>
  </div>
  <div class="road">
    <div class="launch-pad">
      <div class="control-panel">
        <button class="icon start-engine-button" id="start-engine-car-${id}" ${
  isEngineStarted ? 'disabled' : ''
}>A</button>
        <button class="icon stop-engine-button" id="stop-engine-car-${id}" ${
  !isEngineStarted ? 'disabled' : ''
}>B</button>
      </div>
      <div class="car" id="car-${id}">
        ${`
          <svg id="car-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
          <g><path fill="${color}" d="M685,666.4c0,50.3,40.8,91.1,91.1,91.1s91.1-40.8,91.1-91.1c0-50.3-40.8-91.1-91.1-91.1C725.7,575.3,685,616.1,685,666.4z M714.7,666.4c0-33.9,27.5-61.3,61.3-61.3s61.3,27.5,61.3,61.3s-27.5,61.3-61.3,61.3C742.2,727.7,714.7,700.3,714.7,666.4z M91.4,666.4c0,50.3,40.8,91.1,91.1,91.1c50.3,0,91.1-40.8,91.1-91.1c0-50.3-40.8-91.1-91.1-91.1C132.2,575.3,91.4,616.1,91.4,666.4z M121.2,666.4c0-33.9,27.5-61.3,61.3-61.3c33.9,0,61.3,27.5,61.3,61.3s-27.5,61.3-61.3,61.3C148.6,727.7,121.2,700.3,121.2,666.4z M11.7,501.4c-2.5,36.1-1.6,85.5-1.4,114.6c3.7,39.2,15.6,50.4,60.4,62.7c6.8-124.4,110-137.6,158.2-116c71.8,32.1,68.9,115.2,68.9,115.2h363.1c0,0-5.6-66.3,51.9-106.5c56.6-39.6,173.7-10.3,170.2,106.5c33.5,14.7,140.4-2.3,96.7-165.9c-18.3-51.6-53.9-32.4-198-75.3c-64.6-19.2-77.6-89.2-183.6-173.9c-24.7-19.7-73.6-20.2-101.6-20.3C288.8,242,166.7,332.1,84.3,425.4C44.3,443.9,22.5,471.3,11.7,501.4L11.7,501.4z M909.1,556.2c-3.5-5.2-2.7-13.1,0-20.8h60c0,0,10.3,19.3-0.8,50.3C954.8,586.2,934.2,593.1,909.1,556.2L909.1,556.2z M437.6,435.9V284.1c0,0,106.7-24.5,130.4-0.8c23.6,23.6,128.4,127,130,130.5c1.6,3.5,7.9,14.7,0,22.1H437.6L437.6,435.9z M177.9,406.4c97.6-97.8,195.9-111.3,195.9-111.3v132.4l-5.9,8.4c0,0-167.4-1.7-180.7-1.7C173.9,434.2,170.6,413.7,177.9,406.4z M19.2,507.6h53.2c-7.3,38.8-35.5,46.1-35.5,46.1H19.2V507.6z"/></g>
          </svg>
        `}
      </div>
    </div>
    <div class="flag" id="flag-${id}">&#9873;</div>
  </div>
`;

export const renderWinners = (store: Store) => `
  <h2 class='title'>Winners (${store.winnersCount})</h2>
  <h3 class='subtitle'>Page #${store.winnersPage}</h3>
  <table class='table' cellspacing="0" border="0" cellpadding="0">
    <thead>
      <th>Number</th>
      <th>Car name</th>
      <th class="table-button table-wins ${store.sortBy === 'wins' ? store.sortOrder : ''}" id="sort-by-wins">Wins</th>
      <th class="table-button table-time ${store.sortBy === 'time' ? store.sortOrder : ''}" id="sort-by-time">Best time
      </th>
    </thead>
    <tbody>
      ${[...(<WinnersView[]>(<unknown>store.winners))]
        .map((winner, index: number) => {
          return `
            <tr>
              <td>${index + 1}</td>
              <td>${winner.car[0].name}</td>
              <td>${winner.wins}</td>
              <td>${winner.time}</td>
            </tr>
          `;
        })
        .join('')}
    </tbody>
  </table>
`;

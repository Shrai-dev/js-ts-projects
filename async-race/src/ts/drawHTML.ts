import { renderWinners, renderGarage } from './renderViews';
import { Store } from './interfaces';

class DrawHTML {
  store: Store;

  constructor(st: Store) {
    this.store = { ...st };
  }

  render = async (store: Store) => {
    const html = `
        <div class="menu">
          <button class="button garage-menu-button primary" id="garage-menu">To garage</button>
          <button class="button winners-menu-button primary" id="winners-menu">To winners</button>
        </div>
        <div class="wrapper">
          <div id="garage-view">
            <div>
              <form class="form" id="create">
                <input class="input" type="text" name="name" id="create-name">
                <input class="input" type="color" value="#ffffff" name="color" id="create-color">
                <button class="button" type="submit" >Create</button>
              </form>
              <form class="form" id="update">
                <input class="input" type="text" name="name" id="update-name" disabled>
                <input class="input" type="color" value="#ffffff" name="color" id="update-color" disabled>
                <button class="button" type="submit" >Update</button>
              </form>
            </div>
            <div class="race-controls">
              <button class="button race-button primary" id="race">Race</button>
              <button class="button reset-button primary" id="reset">Reset</button>
              <button class="button generator-button" id="generator">Generate cars</button>
            </div>
            <div id="garage">
              ${renderGarage(store)}
            </div>
            <div class="message-wrap">
              <p class="message" id="message"></p>
            </div>
          </div>
          <div id="winners-view" >
            ${renderWinners(store)}
          </div>
          </div>
          <div class="pagination">
            <button class="button primary prev-button" disabled id="prev">Prev</button>
            <button class="button primary next-button" disabled id="next">Next</button>
          </div>
    `;

    const root = document.createElement('div');
    root.classList.add('container');
    root.innerHTML = html;
    document.body.appendChild(root);
  };
}

export default DrawHTML;

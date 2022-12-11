import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesContainer = <HTMLElement>document.querySelector('.sources');
        sourcesContainer.addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data!))
        );
        this.controller.getSources((data) => this.view.drawSources(data!));
        const themeToggler = <HTMLElement>document.querySelector('.header__theme-btn');
        themeToggler.addEventListener('click', () => {
            if ((<HTMLElement>document.querySelector('body')).classList.contains('light-body')) {
                (<HTMLElement>document.querySelector('body')).classList.add('dark-body');
                (<HTMLElement>document.querySelector('body')).classList.remove('light-body');
                themeToggler.innerText = 'light theme';
            } else {
                (<HTMLElement>document.querySelector('body')).classList.remove('dark-body');
                (<HTMLElement>document.querySelector('body')).classList.add('light-body');
                themeToggler.innerText = 'dark theme';
            }
        });
    }
}

export default App;

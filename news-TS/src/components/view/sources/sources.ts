import { ISources } from '../../../types';
import './sources.css';

class Sources {
    draw(data: ISources[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: ISources) => {
            const sourceClone = <DocumentFragment>(sourceItemTemp as HTMLTemplateElement).content.cloneNode(true);
            (<HTMLElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
            (<HTMLElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = <HTMLElement>document.querySelector('.sources');

        sourcesContainer.append(fragment);
    }
}

export default Sources;

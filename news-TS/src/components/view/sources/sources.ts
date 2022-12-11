import { ISources } from '../../../types';
import './sources.css';

class Sources {
    draw(data: ISources[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: ISources) => {
            const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true) as DocumentFragment;
            (sourceClone.querySelector('.source__item-name') as HTMLDivElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources') as HTMLElement;

        sourcesContainer.append(fragment);
    }
}

export default Sources;

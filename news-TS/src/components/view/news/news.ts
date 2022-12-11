import { IItemNews } from '../../../types';
import './news.css';

class News {
    draw(data: IItemNews[]) {
        const news = data.length >= 10 ? data.filter((_item: IItemNews, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: IItemNews, idx: number) => {
            if (newsItemTemp instanceof HTMLTemplateElement) {
                const newsClone = (newsItemTemp as HTMLTemplateElement).content.cloneNode(true) as DocumentFragment;

                if (idx % 2) (newsClone.querySelector('.news__item') as HTMLDivElement).classList.add('alt');

                (newsClone.querySelector('.news__meta-photo') as HTMLDivElement).style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
                (newsClone.querySelector('.news__meta-author') as HTMLDivElement).textContent =
                    item.author || item.source.name;
                (newsClone.querySelector('.news__meta-date') as HTMLDivElement).textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                (newsClone.querySelector('.news__description-title') as HTMLDivElement).textContent = item.title;
                (newsClone.querySelector('.news__description-source') as HTMLDivElement).textContent = item.source.name;
                (newsClone.querySelector('.news__description-content') as HTMLDivElement).textContent =
                    item.description;
                (newsClone.querySelector('.news__read-more a') as HTMLDivElement).setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        const newsContainer = document.querySelector('.news') as HTMLElement;

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;

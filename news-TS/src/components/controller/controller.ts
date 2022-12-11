import { IData } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data?: IData) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data?: IData) => void): void {
        let target = <ParentNode | null>e.target;
        const newsContainer = <EventTarget>e.currentTarget;

        while (target !== newsContainer) {
            if ((<Element>target).classList.contains('source__item')) {
                const sourceId: string | null = (<Element>target).getAttribute('data-source-id');
                if ((<Element>newsContainer).getAttribute('data-source') !== sourceId && sourceId) {
                    (<Element>newsContainer).setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = (target as Element).parentNode;
        }
    }
}

export default AppController;

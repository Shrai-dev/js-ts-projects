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
        let target = e.target as ParentNode | null;
        const newsContainer = e.currentTarget as EventTarget;

        while (target !== newsContainer) {
            if ((target as Element).classList.contains('source__item')) {
                const sourceId: string | null = (target as Element).getAttribute('data-source-id');
                if ((newsContainer as Element).getAttribute('data-source') !== sourceId && sourceId) {
                    (newsContainer as Element).setAttribute('data-source', sourceId);
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

import { API_KEY, API_URL } from '../../types';
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(API_URL.URL, {
            apiKey: API_KEY.KEY,
        });
    }
}

export default AppLoader;

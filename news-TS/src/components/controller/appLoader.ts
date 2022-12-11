import { API_DATA } from '../../types';
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(API_DATA.URL, {
            apiKey: API_DATA.KEY,
        });
    }
}

export default AppLoader;

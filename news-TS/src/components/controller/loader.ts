import { Callback, GetResp, IData, ResponseStatus } from '../../types';

class Loader {
    readonly baseLink: string;
    readonly options: GetResp['options'] | undefined;
    constructor(baseLink: string, options: GetResp['options'] | undefined) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: GetResp,
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ResponseStatus.AUTH_PROBLEM || res.status === ResponseStatus.NO_RESOURCE_FOUND)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: GetResp['options'], endpoint: GetResp['endpoint']): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: GetResp['endpoint'], callback: Callback, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: IData) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;

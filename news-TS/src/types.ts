export interface IItemNews {
    urlToImage: string;
    author: string;
    source: ISource;
    publishedAt: string;
    title: string | null;
    description: string | null;
    url: string;
}

export interface ISources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISource {
    name: string;
    id: string;
}

export interface IData {
    status: string;
    totalResults: number;
    articles: IItemNews[];
    sources: ISources[];
}

export enum API_DATA {
    KEY = 'c467ad4d887946eb9def180f6b8e40dc',
    URL = 'https://newsapi.org/v2/',
}

export enum ResponseStatus {
    AUTH_PROBLEM = 401,
    NO_RESOURCE_FOUND = 404,
}

export type GetResp = {
    endpoint: string;
    options?: Partial<Options>;
};

export type Options = {
    [key: string]: string;
};

export type Callback = <T>(data?: T) => void;

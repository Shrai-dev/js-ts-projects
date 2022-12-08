export interface IItemNews {
    urlToImage: string;
    author: string;
    source: { name: string | null };
    publishedAt: string;
    title: string | null;
    description: string | null;
    url: string;
}

export interface IItemSource {
    name: string;
    id: string;
}

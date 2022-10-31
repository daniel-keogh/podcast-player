export type SearchResults = {
  results: SearchResult[];
};

export type SearchResult = {
  title: string;
  author: string;
  artwork: string;
  feedUrl: string;
  subscriptionId?: string;
};

export type Popular = {
  results: PopularItem[];
};

export type PopularItem = {
  _id: string;
  artwork: string;
  author: string;
  description: string;
  feedUrl: string;
  link: string;
  subscriberCount: number;
  title: string;
};

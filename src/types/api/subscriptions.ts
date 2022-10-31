export interface Subscriptions {
  subscriptions: Subscription[];
}

export interface Subscription {
  _id: string;
  subscriberCount: number;
  title: string;
  author: string;
  artwork: string;
  description: string;
  link: string;
  feedUrl: string;
}

export interface Episodes {
  episode: Episode;
}

export interface Episode {
  audio: Audio;
  author: string;
  date: string;
  description: string;
  guid: string;
  title: string;
}

export interface Audio {
  length: string;
  type: string;
  url: string;
}

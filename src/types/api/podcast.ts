export type Podcast = {
  _id: string;
  title: string;
  author: string;
  artwork: string;
  subscriberCount: number;
  description: string;
  link: string;
  feedUrl: string;
  isSubscribed: boolean;
  episodes: Episode[];
};

export type Episode = {
  audio: Audio;
  date: string;
  guid: string;
  title: string;
};

export type Audio = {
  length: string;
  type: string;
  url: string;
};

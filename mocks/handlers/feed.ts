import { http, HttpResponse } from 'msw';
import feedData from '../data/feed.json';
import { getDiceBearAvatar } from '@/lib/dicebear';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export const feedHandlers = [
  http.get(`${BASE_URL}/get-feed`, () => {
    return HttpResponse.json(feedData, { status: 200 });
  }),

  http.get(`${BASE_URL}/get-featured-image`, (req) => {
    return HttpResponse.json({
      featuredImageUrl: 'https://picsum.photos/400'
    }, { status: 200 });
  }),

  http.get(`${BASE_URL}/get-favicon-image`, (req) => {

    const avatar = getDiceBearAvatar('123')

    return HttpResponse.json({
      faviconImageUrl: avatar
    }, { status: 200 });
  })
];
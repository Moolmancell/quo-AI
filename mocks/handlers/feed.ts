import { http, HttpResponse } from 'msw';
import feedData from '../data/feed.json';
import { getDiceBearAvatar } from '@/lib/dicebear';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

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
  }),

  http.post(`${BASE_URL}/add-bookmark`, ({request}) => {
    const item = request.body as any
    return HttpResponse.json({item: item}, {status: 200})
  }),

  http.delete(`${BASE_URL}/delete-bookmark`, ({request}) => {
    const item = request.body as any
    return HttpResponse.json({item: item}, {status: 200})
  })
];
import { http, HttpResponse } from 'msw';
import feedData from '../data/feed.json';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export const feedHandlers = [
  http.get(`${BASE_URL}/get-feed`, () => {
    return HttpResponse.json(feedData, { status: 200 });
  }),
];
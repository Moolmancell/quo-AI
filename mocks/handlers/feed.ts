import { http, HttpResponse } from 'msw';
import feedData from '../data/feed.json';
import { getDiceBearAvatar } from '@/lib/dicebear';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

//TODO: Change API endpoints to match those in src/app.ts (quo-ai-backend) when created
export const feedHandlers = [
  http.get(`${BASE_URL}/get-feed`, () => {
    return HttpResponse.json(feedData, { status: 200 });
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
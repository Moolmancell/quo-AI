import { http, HttpResponse } from 'msw';
import feedData from '../data/feed.json';
import feedData2 from '../data/feed2.json';
import { getDiceBearAvatar } from '@/lib/dicebear';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
let callCount = 1;
//TODO: Change API endpoints to match those in src/app.ts (quo-ai-backend) when created
export const feedHandlers = [
  http.get(`${BASE_URL}/feed/get-feed`, () => {
    callCount++;
    if (callCount % 2 === 0) {
      return HttpResponse.json(feedData2, { status: 200 });
    } else {
      return HttpResponse.json(feedData, { status: 200 });
    }
  }),

  http.post(`${BASE_URL}/feed/add-bookmark`, ({request}) => {
    const item = request.body as any
    return HttpResponse.json({item: item}, {status: 200})
  }),

  http.delete(`${BASE_URL}/feed/delete-bookmark`, ({request}) => {
    const item = request.body as any
    return HttpResponse.json({item: item}, {status: 200})
  })
];
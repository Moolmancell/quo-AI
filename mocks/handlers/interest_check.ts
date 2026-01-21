import { http, HttpResponse } from 'msw';
import { int } from 'zod';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;


export const interestCheckHandlers = [

  http.get(`${BASE_URL}/interests/:userID`, () => {
    //NOTE: for no interests selected, return empty array
    return HttpResponse.json({ interests: ["Something"] }, { status: 200 });
  }),

  http.post(`${BASE_URL}/submit-interests/:userID`, async ({ request }) => {
    const body = await request.json() as { interests: string[] }
    console.log('received request body interests', body);
    return HttpResponse.json({ status: 200 });
  }),

  http.get(`${BASE_URL}/generate-interests`, async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return HttpResponse.json({ interests: ["Music", "Travel", "Sports", "Cooking", "Fitness", "Movies"] }, { status: 200 });
  }),
];
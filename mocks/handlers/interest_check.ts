import { http, HttpResponse } from 'msw';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export const interestCheckHandlers = [
  http.get(`${BASE_URL}/interests/:userID`, () => {
    return HttpResponse.json({interests: ['philosophy', 'software development']}, { status: 200 });
  }),
];
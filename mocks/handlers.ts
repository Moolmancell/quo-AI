import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://api.example.com/signup-success', async ({ request }) => {
    return HttpResponse.json(
      { message: 'Account created successfully!' },
      { status: 201 }
    );
  }),
];
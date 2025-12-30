import { http, HttpResponse } from 'msw';

const AUTH_BASE_URL = '*/api/auth';

export const authHandlers = [
  http.post(`${AUTH_BASE_URL}/sign-up/email`, async ({ request }) => {
    const body = await request.json() as any;
    if (body.email === "taken@example.com") {
      return HttpResponse.json({ message: "User already exists" }, { status: 400 });
    }
    return HttpResponse.json({ user: { id: "123", email: body.email } }, { status: 200 });
  }),

  http.get(`${AUTH_BASE_URL}/get-session`, () => {
    return HttpResponse.json({ user: { id: "123", name: "John Doe" } }, { status: 200 });
  }),
];
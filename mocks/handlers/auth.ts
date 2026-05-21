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

  http.get(`${AUTH_BASE_URL}/get-session`, ({ request }) => {
    // Optional: Simulate a logged-out state if no cookie/token is passed
    // const hasAuth = request.headers.get('cookie') || request.headers.get('authorization');
    // if (!hasAuth) {
    //   return new HttpResponse(null, { status: 401 });
    // }

    return HttpResponse.json({
      user: {
        id: "user_123",
        name: "John Doe",
        email: "john.doe@example.com",
        emailVerified: true,
        image: "https://example.com/avatar.png",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      session: {
        id: "session_abc123",
        userId: "user_123",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Expired in 24 hours
        token: "mock-session-token",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0...",
      }
    }, { status: 200 });
  }),
];
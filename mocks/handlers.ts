import { http, HttpResponse } from 'msw';

// Replace 'http://localhost:3000' with your actual base URL if different
const AUTH_BASE_URL = '*/api/auth';

export const handlers = [
  // 1. Mock Sign Up
  http.post(`${AUTH_BASE_URL}/sign-up/email`, async ({ request }) => {
    const body = await request.json() as any;

    // Simulation: Fail if email is already taken
    if (body.email === "taken@example.com") {
      return HttpResponse.json(
        { message: "User already exists", code: "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      user: {
        id: "user_123",
        email: body.email,
        name: body.name,
        image: null,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      session: {
        id: "session_123",
        userId: "user_123",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        token: "mock_token",
      }
    }, { status: 200 });
  }),

  // 2. Mock Sign In
  http.post(`${AUTH_BASE_URL}/sign-in/email`, async ({ request }) => {
    const body = await request.json() as any;

    // Simulation: Invalid credentials
    if (body.password === "wrongpassword") {
      return HttpResponse.json(
        { message: "Invalid email or password", code: "INVALID_CREDENTIALS" },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      user: { id: "user_123", email: body.email, name: "John Doe" },
      session: { id: "session_123", token: "mock_token" }
    }, { status: 200 });
  }),

  // 3. Mock Get Session (Important for useSession hooks)
  http.get(`${AUTH_BASE_URL}/get-session`, () => {
    return HttpResponse.json({
      user: { id: "user_123", email: "john@example.com", name: "John Doe" },
      session: { id: "session_123" }
    }, { status: 200 });
  }),
];
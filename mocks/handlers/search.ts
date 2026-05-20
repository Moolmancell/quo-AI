import { http, HttpResponse } from 'msw';
import { set } from 'zod';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

//TODO: Change API endpoints to match those in src/app.ts (quo-ai-backend) when created
export const searchHandlers = [
    http.get(`${BASE_URL}/get-recent-searches`, () => {
        
        setTimeout(() => null, 1000); // Simulate network delay
        
        return HttpResponse.json([
            "Philosophy",
            "Programming",
            "Addiction",
            "Researching",
            "Animals",
            "Star Wars",
            "Elden Ring",
            "Video Games"
        ], { status: 200 });
    }),
];
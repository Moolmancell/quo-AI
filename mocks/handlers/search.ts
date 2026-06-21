import { http, HttpResponse } from 'msw';
import searchArticles from '../data/search-articles.json';
import searchQuotes from '../data/search-quotes.json';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/search`;

//TODO: Change API endpoints to match those in src/app.ts (quo-ai-backend) when created
export const searchHandlers = [

    http.get(`${BASE_URL}`, async ({ request }) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const url = new URL(request.url);
        const query = url.searchParams.get("q") || "";
        const type = url.searchParams.get("type") || "Articles/Essays";

        if (type === "Quotes") {
            return HttpResponse.json(searchQuotes);
        }

        // Articles/Essays (default)
        return HttpResponse.json(searchArticles);
    }),

    http.get(`${BASE_URL}/get-recent-searches`, async () => {

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

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

    http.delete(`${BASE_URL}/remove-recent-search`, async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        return HttpResponse.json({}, { status: 200 });
    }),

    http.post(`${BASE_URL}/clear-recent-search`, async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        return HttpResponse.json({}, { status: 200 });
    }),
];
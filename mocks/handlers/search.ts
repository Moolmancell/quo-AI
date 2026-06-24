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
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "12", 10);

        if (type === "Quotes") {
            const data = searchQuotes.data;
            const start = (page - 1) * limit;
            const sliced = data.slice(start, start + limit);

            return HttpResponse.json({
                success: true,
                data: sliced,
                hasMore: start + limit < data.length,
            });
        }

        // Articles/Essays (default)
        const data = searchArticles.data;
        const start = (page - 1) * limit;
        const sliced = data.slice(start, start + limit);

        return HttpResponse.json({
            success: true,
            data: sliced,
            hasMore: start + limit < data.length,
        });
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
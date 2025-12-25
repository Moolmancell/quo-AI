import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

if (process.env.MODE === 'development') {
    worker.start();
}

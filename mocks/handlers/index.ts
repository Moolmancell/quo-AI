import { authHandlers } from './auth';
import { feedHandlers } from './feed';

export const handlers = [
  ...authHandlers,
  ...feedHandlers,
  // Add more handlers here as you build them
];
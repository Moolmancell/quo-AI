import { authHandlers } from './auth';
import { feedHandlers } from './feed';
import { interestCheckHandlers } from './interest_check';

export const handlers = [
  ...authHandlers,
  ...feedHandlers,
  ...interestCheckHandlers,
  // Add more handlers here as you build them
];
import { authHandlers } from './auth';
import { feedHandlers } from './feed';
import { interestCheckHandlers } from './interest_check';
import { searchHandlers } from './search';

export const handlers = [
  ...authHandlers,
  ...feedHandlers,
  ...interestCheckHandlers,
  ...searchHandlers
  // Add more handlers here as you build them
];
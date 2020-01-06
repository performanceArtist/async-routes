import { Communication } from './types';

export function isCompletedComm(prev: Communication, next: Communication): boolean {
  return prev.isRequesting && !next.isRequesting && !next.error;
}

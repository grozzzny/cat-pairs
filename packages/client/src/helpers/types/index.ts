export * from './user';
export * from './api';

export type typeWithSignal<T> = T & { signal: AbortSignal | null | undefined };

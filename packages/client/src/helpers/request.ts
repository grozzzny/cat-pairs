export function isRequestError(status: number) {
  return 400 <= status;
}

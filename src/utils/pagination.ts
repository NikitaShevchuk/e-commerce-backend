export const getSkipAmount = (page: string, limit: string): number =>
    (Number(page) - 1) * Number(limit);

export const getNextPageNumber = (page: string): number => Number(page) + 1;

export const getHasNextPage = (page: string, limit: string, total: number): boolean =>
    Number(limit) * Number(page) < total;

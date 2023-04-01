import type { DefaultResponse } from "../Types/Response";
import { getNextPageNumber, getHasNextPage } from "./pagination";

export const getResultWithPagination = <DataType>(
    data: DataType,
    total: number,
    page: string,
    limit: string
): DefaultResponse<DataType> => ({
    success: true,
    data,
    pagination: {
        total,
        nextPageNumber: getNextPageNumber(page),
        hasNextPage: getHasNextPage(page, limit, total)
    }
});

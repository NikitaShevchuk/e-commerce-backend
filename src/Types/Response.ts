import type { ValidationError } from "express-validator";

export interface Pagination {
    total: number;
    hasNextPage: boolean;
    nextPageNumber: number;
}

export interface DefaultResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    token?: string;
    isAuthorized?: boolean;
    validationErrors?: ValidationError[];
    total?: number;
    pagination?: Pagination;
}

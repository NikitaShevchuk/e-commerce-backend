import type { DefaultResponse } from "../Types/Response";

export const createErrorResult = (message: string): DefaultResponse<undefined> => ({
    success: false,
    message
});

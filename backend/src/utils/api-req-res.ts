export class ApiResponse<T = unknown> {
    success: boolean;

    constructor(
        public statusCode: number,
        public message: string = "success",
        public data?: T
    ) {
        this.success = statusCode < 400;
    }
}

export class ApiError extends Error {
    constructor(
        public statusCode: number = 500,
        message: string = "Something went wrong",
        public errors: unknown[] = []
    ) {
        super(message);

        this.name = "ApiError";

        Error.captureStackTrace?.(this, ApiError);
    }
}
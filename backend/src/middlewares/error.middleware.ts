import type { ErrorRequestHandler } from "express";
import { ApiError, ApiResponse } from "../utils/api-req-res.js";

const errorHandler: ErrorRequestHandler = (
    error,
    req,
    res,
    next
) => {
    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof ApiError) {
        res.status(error.statusCode).json(
            new ApiResponse(error.statusCode, error.message)
        );
        return;
    }

    console.error("Unexpected error:", error);

    res.status(500).json(
        new ApiResponse(500, "Internal Server Error")
    );
};

export default errorHandler;
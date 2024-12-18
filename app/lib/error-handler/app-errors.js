
import constants from "../constants";
const { STATUS_CODES } = constants;
class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = status || STATUS_CODES.INTERNAL_ERROR;
        //include only relavant part the error.
        Error.captureStackTrace(this, this.constructor);
    }
}
class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = status || STATUS_CODES.INTERNAL_ERROR;
        //include only relavant part the error.
        Error.captureStackTrace(this, this.constructor);
    }
}

export class UserServiceError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
}

export class StripeServiceError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
}
export class SearchRequestServiceError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
}

export class SubServiceError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
}
export class CreditServiceError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
}
export class S3ServiceError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
}
export class AppServiceError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
}
export class ChatGptPromptError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
}


export class EmailServiceError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode || STATUS_CODES.INTERNAL_ERROR);
    }
}

export class OpenAIServiceNotFoundError extends AppError {
    constructor(message, statusCode) {
        super(message || 'Open ai error.', statusCode || STATUS_CODES.NOT_FOUND);
    }
}


export { AppError, ApiError };

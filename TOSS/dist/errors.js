"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyInputError = exports.NotFoundError = exports.ErrorBase = void 0;
class ErrorBase extends Error {
    name;
    message;
    cause;
    constructor({ name, message, cause }) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}
exports.ErrorBase = ErrorBase;
class NotFoundError extends ErrorBase {
    constructor(message) {
        super({ name: 'NOT_FOUND_ERROR', message });
    }
}
exports.NotFoundError = NotFoundError;
class EmptyInputError extends ErrorBase {
    constructor(message) {
        super({ name: 'EMPTY_INPUT_ERROR', message });
    }
}
exports.EmptyInputError = EmptyInputError;

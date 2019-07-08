class ApiError {
    code: number;
    message: string;
    description?: string;
    
    constructor(code: number, message: string, description?: string) {
        this.code = code;
        this.message = message;
        this.description = description || '';
    }
}

export { ApiError };
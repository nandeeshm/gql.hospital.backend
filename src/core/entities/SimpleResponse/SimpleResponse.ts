class SimpleResponse {
    result: string;
    constructor (result?: string) {
        this.result = result || 'OK';
    }
}

export default SimpleResponse;
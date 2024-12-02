import { debugLog } from "../utils/logger";

class ResponseFormat {
    success: boolean;
    statusCode: number;
    data: any;
    constructor({success, statusCode, data}: ResponseFormat) {
        if (success === undefined || statusCode === undefined || data === undefined ||
            typeof success !== "boolean" ||
            typeof statusCode !== "number") {
            debugLog(success, statusCode, data);
            throw new Error("Server responded with unknown format");
        }
        this.success = success;
        this.statusCode = statusCode;
        this.data = data;
    }
}

export {ResponseFormat};

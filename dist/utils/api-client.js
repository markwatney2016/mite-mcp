"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiteApiClient = void 0;
class MiteApiClient {
    baseUrl;
    _headers;
    get headers() {
        return this._headers;
    }
    constructor(config) {
        this.baseUrl = `https://${config.accountName}.mite.de`;
        this._headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'mite-mcp/0.1.0',
        };
        if (config.apiKey) {
            this._headers['X-MiteApiKey'] = config.apiKey;
        }
        else if (config.email && config.password) {
            const auth = Buffer.from(`${config.email}:${config.password}`).toString('base64');
            this._headers.Authorization = `Basic ${auth}`;
        }
    }
    async request(method, path, body, queryParams) {
        const url = new URL(`${this.baseUrl}${path}`);
        if (queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }
        const options = {
            method,
            headers: this._headers,
        };
        if (body && (method === 'POST' || method === 'PATCH')) {
            options.body = JSON.stringify(body);
        }
        try {
            const response = await fetch(url.toString(), options);
            if (!response.ok) {
                const errorData = (await response.json().catch(() => ({
                    error: 'Unknown error',
                    message: response.statusText,
                })));
                throw new Error(`API Error (${response.status}): ${errorData.message || errorData.error}`);
            }
            if (response.status === 204) {
                return {};
            }
            return (await response.json());
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(`Request failed: ${String(error)}`);
        }
    }
    async get(path, queryParams) {
        return this.request('GET', path, undefined, queryParams);
    }
    async post(path, body) {
        return this.request('POST', path, body);
    }
    async patch(path, body) {
        return this.request('PATCH', path, body);
    }
    async delete(path) {
        await this.request('DELETE', path);
    }
}
exports.MiteApiClient = MiteApiClient;
//# sourceMappingURL=api-client.js.map
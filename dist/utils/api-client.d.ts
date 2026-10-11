import type { MiteConfig } from '../types/index.js';
export declare class MiteApiClient {
    private baseUrl;
    private _headers;
    get headers(): Record<string, string>;
    constructor(config: MiteConfig);
    request<T>(method: string, path: string, body?: unknown, queryParams?: Record<string, string | number | boolean>): Promise<T>;
    get<T>(path: string, queryParams?: Record<string, string | number | boolean>): Promise<T>;
    post<T>(path: string, body: unknown): Promise<T>;
    patch<T>(path: string, body: unknown): Promise<T>;
    delete(path: string): Promise<void>;
}
//# sourceMappingURL=api-client.d.ts.map
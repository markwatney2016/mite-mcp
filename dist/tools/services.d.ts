import { z } from 'zod';
import type { Service } from '../types/index.js';
import type { MiteApiClient } from '../utils/api-client.js';
declare const listServicesSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    page: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    archived?: boolean | undefined;
}, {
    name?: string | undefined;
    limit?: string | number | undefined;
    page?: string | number | undefined;
    archived?: string | boolean | undefined;
}>;
declare const createServiceSchema: z.ZodObject<{
    name: z.ZodString;
    note: z.ZodOptional<z.ZodString>;
    hourly_rate: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    billable: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
    archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    archived?: boolean | undefined;
    note?: string | undefined;
    hourly_rate?: number | undefined;
    billable?: boolean | undefined;
}, {
    name: string;
    archived?: string | boolean | undefined;
    note?: string | undefined;
    hourly_rate?: string | number | undefined;
    billable?: string | boolean | undefined;
}>;
declare const updateServiceSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
    name: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    hourly_rate: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    billable: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
    archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
    update_hourly_rate_on_time_entries: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name?: string | undefined;
    archived?: boolean | undefined;
    note?: string | undefined;
    hourly_rate?: number | undefined;
    update_hourly_rate_on_time_entries?: boolean | undefined;
    billable?: boolean | undefined;
}, {
    id: string | number;
    name?: string | undefined;
    archived?: string | boolean | undefined;
    note?: string | undefined;
    hourly_rate?: string | number | undefined;
    update_hourly_rate_on_time_entries?: string | boolean | undefined;
    billable?: string | boolean | undefined;
}>;
declare const getServiceSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
declare const deleteServiceSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
export declare function createServicesTools(apiClient: MiteApiClient): {
    listServices: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            page: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
            archived?: boolean | undefined;
        }, {
            name?: string | undefined;
            limit?: string | number | undefined;
            page?: string | number | undefined;
            archived?: string | boolean | undefined;
        }>;
        execute: (input: z.infer<typeof listServicesSchema>) => Promise<{
            services: Service[];
        }>;
    };
    getService: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof getServiceSchema>) => Promise<Service>;
    };
    createService: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            note: z.ZodOptional<z.ZodString>;
            hourly_rate: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            billable: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
            archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            archived?: boolean | undefined;
            note?: string | undefined;
            hourly_rate?: number | undefined;
            billable?: boolean | undefined;
        }, {
            name: string;
            archived?: string | boolean | undefined;
            note?: string | undefined;
            hourly_rate?: string | number | undefined;
            billable?: string | boolean | undefined;
        }>;
        execute: (input: z.infer<typeof createServiceSchema>) => Promise<Service>;
    };
    updateService: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
            name: z.ZodOptional<z.ZodString>;
            note: z.ZodOptional<z.ZodString>;
            hourly_rate: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            billable: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
            archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
            update_hourly_rate_on_time_entries: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            name?: string | undefined;
            archived?: boolean | undefined;
            note?: string | undefined;
            hourly_rate?: number | undefined;
            update_hourly_rate_on_time_entries?: boolean | undefined;
            billable?: boolean | undefined;
        }, {
            id: string | number;
            name?: string | undefined;
            archived?: string | boolean | undefined;
            note?: string | undefined;
            hourly_rate?: string | number | undefined;
            update_hourly_rate_on_time_entries?: string | boolean | undefined;
            billable?: string | boolean | undefined;
        }>;
        execute: (input: z.infer<typeof updateServiceSchema>) => Promise<Service>;
    };
    deleteService: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof deleteServiceSchema>) => Promise<{
            success: boolean;
            id: number;
        }>;
    };
};
export {};
//# sourceMappingURL=services.d.ts.map
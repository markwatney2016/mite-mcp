import { z } from 'zod';
import type { Customer } from '../types/index.js';
import type { MiteApiClient } from '../utils/api-client.js';
declare const listCustomersSchema: z.ZodObject<{
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
declare const createCustomerSchema: z.ZodObject<{
    name: z.ZodString;
    note: z.ZodOptional<z.ZodString>;
    archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
    hourly_rate: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    hourly_rates_per_service: z.ZodOptional<z.ZodArray<z.ZodObject<{
        service_id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        hourly_rate: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
    }, "strip", z.ZodTypeAny, {
        hourly_rate: number;
        service_id: number;
    }, {
        hourly_rate: string | number;
        service_id: string | number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    archived?: boolean | undefined;
    note?: string | undefined;
    hourly_rate?: number | undefined;
    hourly_rates_per_service?: {
        hourly_rate: number;
        service_id: number;
    }[] | undefined;
}, {
    name: string;
    archived?: string | boolean | undefined;
    note?: string | undefined;
    hourly_rate?: string | number | undefined;
    hourly_rates_per_service?: {
        hourly_rate: string | number;
        service_id: string | number;
    }[] | undefined;
}>;
declare const updateCustomerSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
    name: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
    hourly_rate: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    hourly_rates_per_service: z.ZodOptional<z.ZodArray<z.ZodObject<{
        service_id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        hourly_rate: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
    }, "strip", z.ZodTypeAny, {
        hourly_rate: number;
        service_id: number;
    }, {
        hourly_rate: string | number;
        service_id: string | number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name?: string | undefined;
    archived?: boolean | undefined;
    note?: string | undefined;
    hourly_rate?: number | undefined;
    hourly_rates_per_service?: {
        hourly_rate: number;
        service_id: number;
    }[] | undefined;
}, {
    id: string | number;
    name?: string | undefined;
    archived?: string | boolean | undefined;
    note?: string | undefined;
    hourly_rate?: string | number | undefined;
    hourly_rates_per_service?: {
        hourly_rate: string | number;
        service_id: string | number;
    }[] | undefined;
}>;
declare const getCustomerSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
declare const deleteCustomerSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
export declare function createCustomersTools(apiClient: MiteApiClient): {
    listCustomers: {
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
        execute: (input: z.infer<typeof listCustomersSchema>) => Promise<{
            customers: Customer[];
        }>;
    };
    getCustomer: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof getCustomerSchema>) => Promise<Customer>;
    };
    createCustomer: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            note: z.ZodOptional<z.ZodString>;
            archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
            hourly_rate: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            hourly_rates_per_service: z.ZodOptional<z.ZodArray<z.ZodObject<{
                service_id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
                hourly_rate: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
            }, "strip", z.ZodTypeAny, {
                hourly_rate: number;
                service_id: number;
            }, {
                hourly_rate: string | number;
                service_id: string | number;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            archived?: boolean | undefined;
            note?: string | undefined;
            hourly_rate?: number | undefined;
            hourly_rates_per_service?: {
                hourly_rate: number;
                service_id: number;
            }[] | undefined;
        }, {
            name: string;
            archived?: string | boolean | undefined;
            note?: string | undefined;
            hourly_rate?: string | number | undefined;
            hourly_rates_per_service?: {
                hourly_rate: string | number;
                service_id: string | number;
            }[] | undefined;
        }>;
        execute: (input: z.infer<typeof createCustomerSchema>) => Promise<Customer>;
    };
    updateCustomer: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
            name: z.ZodOptional<z.ZodString>;
            note: z.ZodOptional<z.ZodString>;
            archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
            hourly_rate: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            hourly_rates_per_service: z.ZodOptional<z.ZodArray<z.ZodObject<{
                service_id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
                hourly_rate: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
            }, "strip", z.ZodTypeAny, {
                hourly_rate: number;
                service_id: number;
            }, {
                hourly_rate: string | number;
                service_id: string | number;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            name?: string | undefined;
            archived?: boolean | undefined;
            note?: string | undefined;
            hourly_rate?: number | undefined;
            hourly_rates_per_service?: {
                hourly_rate: number;
                service_id: number;
            }[] | undefined;
        }, {
            id: string | number;
            name?: string | undefined;
            archived?: string | boolean | undefined;
            note?: string | undefined;
            hourly_rate?: string | number | undefined;
            hourly_rates_per_service?: {
                hourly_rate: string | number;
                service_id: string | number;
            }[] | undefined;
        }>;
        execute: (input: z.infer<typeof updateCustomerSchema>) => Promise<Customer>;
    };
    deleteCustomer: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof deleteCustomerSchema>) => Promise<{
            success: boolean;
            id: number;
        }>;
    };
};
export {};
//# sourceMappingURL=customers.d.ts.map
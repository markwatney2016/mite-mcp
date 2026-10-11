import { z } from 'zod';
import type { Project } from '../types/index.js';
import type { MiteApiClient } from '../utils/api-client.js';
declare const listProjectsSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    page: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    archived?: boolean | undefined;
    customer_id?: number | undefined;
}, {
    name?: string | undefined;
    limit?: string | number | undefined;
    page?: string | number | undefined;
    archived?: string | boolean | undefined;
    customer_id?: string | number | undefined;
}>;
declare const createProjectSchema: z.ZodObject<{
    name: z.ZodString;
    note: z.ZodOptional<z.ZodString>;
    customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    budget: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    budget_type: z.ZodOptional<z.ZodString>;
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
    customer_id?: number | undefined;
    budget?: number | undefined;
    budget_type?: string | undefined;
}, {
    name: string;
    archived?: string | boolean | undefined;
    note?: string | undefined;
    hourly_rate?: string | number | undefined;
    hourly_rates_per_service?: {
        hourly_rate: string | number;
        service_id: string | number;
    }[] | undefined;
    customer_id?: string | number | undefined;
    budget?: string | number | undefined;
    budget_type?: string | undefined;
}>;
declare const updateProjectSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
    name: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    budget: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    budget_type: z.ZodOptional<z.ZodString>;
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
    update_hourly_rate_on_time_entries: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
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
    customer_id?: number | undefined;
    budget?: number | undefined;
    budget_type?: string | undefined;
    update_hourly_rate_on_time_entries?: boolean | undefined;
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
    customer_id?: string | number | undefined;
    budget?: string | number | undefined;
    budget_type?: string | undefined;
    update_hourly_rate_on_time_entries?: string | boolean | undefined;
}>;
declare const getProjectSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
declare const deleteProjectSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
export declare function createProjectsTools(apiClient: MiteApiClient): {
    listProjects: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            page: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
            archived?: boolean | undefined;
            customer_id?: number | undefined;
        }, {
            name?: string | undefined;
            limit?: string | number | undefined;
            page?: string | number | undefined;
            archived?: string | boolean | undefined;
            customer_id?: string | number | undefined;
        }>;
        execute: (input: z.infer<typeof listProjectsSchema>) => Promise<{
            projects: Project[];
        }>;
    };
    getProject: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof getProjectSchema>) => Promise<Project>;
    };
    createProject: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            note: z.ZodOptional<z.ZodString>;
            customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            budget: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            budget_type: z.ZodOptional<z.ZodString>;
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
            customer_id?: number | undefined;
            budget?: number | undefined;
            budget_type?: string | undefined;
        }, {
            name: string;
            archived?: string | boolean | undefined;
            note?: string | undefined;
            hourly_rate?: string | number | undefined;
            hourly_rates_per_service?: {
                hourly_rate: string | number;
                service_id: string | number;
            }[] | undefined;
            customer_id?: string | number | undefined;
            budget?: string | number | undefined;
            budget_type?: string | undefined;
        }>;
        execute: (input: z.infer<typeof createProjectSchema>) => Promise<Project>;
    };
    updateProject: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
            name: z.ZodOptional<z.ZodString>;
            note: z.ZodOptional<z.ZodString>;
            customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            budget: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            budget_type: z.ZodOptional<z.ZodString>;
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
            update_hourly_rate_on_time_entries: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
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
            customer_id?: number | undefined;
            budget?: number | undefined;
            budget_type?: string | undefined;
            update_hourly_rate_on_time_entries?: boolean | undefined;
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
            customer_id?: string | number | undefined;
            budget?: string | number | undefined;
            budget_type?: string | undefined;
            update_hourly_rate_on_time_entries?: string | boolean | undefined;
        }>;
        execute: (input: z.infer<typeof updateProjectSchema>) => Promise<Project>;
    };
    deleteProject: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof deleteProjectSchema>) => Promise<{
            success: boolean;
            id: number;
        }>;
    };
};
export {};
//# sourceMappingURL=projects.d.ts.map
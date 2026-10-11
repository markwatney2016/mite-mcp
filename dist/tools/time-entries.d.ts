import { z } from 'zod';
import type { GroupedTimeEntry, TimeEntry } from '../types/index.js';
import type { MiteApiClient } from '../utils/api-client.js';
declare const listTimeEntriesSchema: z.ZodObject<{
    user_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    billable: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
    locked: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
    limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    page: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    group_by: z.ZodOptional<z.ZodEnum<["customer", "project", "service", "user", "day", "week", "month", "year"]>>;
}, "strip", z.ZodTypeAny, {
    from?: string | undefined;
    limit?: number | undefined;
    page?: number | undefined;
    service_id?: number | undefined;
    customer_id?: number | undefined;
    billable?: boolean | undefined;
    project_id?: number | undefined;
    user_id?: number | undefined;
    to?: string | undefined;
    locked?: boolean | undefined;
    group_by?: "customer" | "project" | "service" | "user" | "day" | "week" | "month" | "year" | undefined;
}, {
    from?: string | undefined;
    limit?: string | number | undefined;
    page?: string | number | undefined;
    service_id?: string | number | undefined;
    customer_id?: string | number | undefined;
    billable?: string | boolean | undefined;
    project_id?: string | number | undefined;
    user_id?: string | number | undefined;
    to?: string | undefined;
    locked?: string | boolean | undefined;
    group_by?: "customer" | "project" | "service" | "user" | "day" | "week" | "month" | "year" | undefined;
}>;
declare const createTimeEntrySchema: z.ZodObject<{
    date_at: z.ZodOptional<z.ZodString>;
    minutes: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    note: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    locked: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
}, "strip", z.ZodTypeAny, {
    note?: string | undefined;
    service_id?: number | undefined;
    project_id?: number | undefined;
    user_id?: number | undefined;
    locked?: boolean | undefined;
    date_at?: string | undefined;
    minutes?: number | undefined;
}, {
    note?: string | undefined;
    service_id?: string | number | undefined;
    project_id?: string | number | undefined;
    user_id?: string | number | undefined;
    locked?: string | boolean | undefined;
    date_at?: string | undefined;
    minutes?: string | number | undefined;
}>;
declare const updateTimeEntrySchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>>;
    time_entry_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>>;
    date_at: z.ZodOptional<z.ZodString>;
    minutes: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    note: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    locked: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
}, "strip", z.ZodTypeAny, {
    note?: string | undefined;
    service_id?: number | undefined;
    id?: number | undefined;
    project_id?: number | undefined;
    user_id?: number | undefined;
    locked?: boolean | undefined;
    date_at?: string | undefined;
    minutes?: number | undefined;
    time_entry_id?: number | undefined;
}, {
    note?: string | undefined;
    service_id?: string | number | undefined;
    id?: string | number | undefined;
    project_id?: string | number | undefined;
    user_id?: string | number | undefined;
    locked?: string | boolean | undefined;
    date_at?: string | undefined;
    minutes?: string | number | undefined;
    time_entry_id?: string | number | undefined;
}>, {
    note?: string | undefined;
    service_id?: number | undefined;
    id?: number | undefined;
    project_id?: number | undefined;
    user_id?: number | undefined;
    locked?: boolean | undefined;
    date_at?: string | undefined;
    minutes?: number | undefined;
    time_entry_id?: number | undefined;
}, {
    note?: string | undefined;
    service_id?: string | number | undefined;
    id?: string | number | undefined;
    project_id?: string | number | undefined;
    user_id?: string | number | undefined;
    locked?: string | boolean | undefined;
    date_at?: string | undefined;
    minutes?: string | number | undefined;
    time_entry_id?: string | number | undefined;
}>;
declare const getDailyTimeEntriesSchema: z.ZodObject<{
    at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    at?: string | undefined;
}, {
    at?: string | undefined;
}>;
declare const getTimeEntrySummarySchema: z.ZodObject<{
    group_by: z.ZodEnum<["customer", "project", "service", "user"]>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
}, "strip", z.ZodTypeAny, {
    group_by: "customer" | "project" | "service" | "user";
    from?: string | undefined;
    service_id?: number | undefined;
    customer_id?: number | undefined;
    project_id?: number | undefined;
    user_id?: number | undefined;
    to?: string | undefined;
}, {
    group_by: "customer" | "project" | "service" | "user";
    from?: string | undefined;
    service_id?: string | number | undefined;
    customer_id?: string | number | undefined;
    project_id?: string | number | undefined;
    user_id?: string | number | undefined;
    to?: string | undefined;
}>;
declare const getTimeEntrySchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
declare const deleteTimeEntrySchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
export declare function createTimeEntriesTools(apiClient: MiteApiClient): {
    listTimeEntries: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            user_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            from: z.ZodOptional<z.ZodString>;
            to: z.ZodOptional<z.ZodString>;
            billable: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
            locked: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
            limit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            page: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            group_by: z.ZodOptional<z.ZodEnum<["customer", "project", "service", "user", "day", "week", "month", "year"]>>;
        }, "strip", z.ZodTypeAny, {
            from?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
            service_id?: number | undefined;
            customer_id?: number | undefined;
            billable?: boolean | undefined;
            project_id?: number | undefined;
            user_id?: number | undefined;
            to?: string | undefined;
            locked?: boolean | undefined;
            group_by?: "customer" | "project" | "service" | "user" | "day" | "week" | "month" | "year" | undefined;
        }, {
            from?: string | undefined;
            limit?: string | number | undefined;
            page?: string | number | undefined;
            service_id?: string | number | undefined;
            customer_id?: string | number | undefined;
            billable?: string | boolean | undefined;
            project_id?: string | number | undefined;
            user_id?: string | number | undefined;
            to?: string | undefined;
            locked?: string | boolean | undefined;
            group_by?: "customer" | "project" | "service" | "user" | "day" | "week" | "month" | "year" | undefined;
        }>;
        execute: (input: z.infer<typeof listTimeEntriesSchema>) => Promise<{
            entries: GroupedTimeEntry[];
            grouped: boolean;
            group_by: "customer" | "project" | "service" | "user" | "day" | "week" | "month" | "year";
            warning?: undefined;
        } | {
            entries: TimeEntry[];
            grouped: boolean;
            warning: string;
            group_by?: undefined;
        } | {
            entries: TimeEntry[];
            grouped: boolean;
            group_by?: undefined;
            warning?: undefined;
        }>;
    };
    getDailyTimeEntries: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            at?: string | undefined;
        }, {
            at?: string | undefined;
        }>;
        execute: (input: z.infer<typeof getDailyTimeEntriesSchema>) => Promise<{
            entries: TimeEntry[];
        }>;
    };
    getTimeEntry: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof getTimeEntrySchema>) => Promise<TimeEntry>;
    };
    createTimeEntry: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            date_at: z.ZodOptional<z.ZodString>;
            minutes: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            note: z.ZodOptional<z.ZodString>;
            user_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            locked: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
        }, "strip", z.ZodTypeAny, {
            note?: string | undefined;
            service_id?: number | undefined;
            project_id?: number | undefined;
            user_id?: number | undefined;
            locked?: boolean | undefined;
            date_at?: string | undefined;
            minutes?: number | undefined;
        }, {
            note?: string | undefined;
            service_id?: string | number | undefined;
            project_id?: string | number | undefined;
            user_id?: string | number | undefined;
            locked?: string | boolean | undefined;
            date_at?: string | undefined;
            minutes?: string | number | undefined;
        }>;
        execute: (input: z.infer<typeof createTimeEntrySchema>) => Promise<TimeEntry>;
    };
    updateTimeEntry: {
        name: string;
        description: string;
        inputSchema: z.ZodEffects<z.ZodObject<{
            id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>>;
            time_entry_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>>;
            date_at: z.ZodOptional<z.ZodString>;
            minutes: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            note: z.ZodOptional<z.ZodString>;
            user_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            locked: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
        }, "strip", z.ZodTypeAny, {
            note?: string | undefined;
            service_id?: number | undefined;
            id?: number | undefined;
            project_id?: number | undefined;
            user_id?: number | undefined;
            locked?: boolean | undefined;
            date_at?: string | undefined;
            minutes?: number | undefined;
            time_entry_id?: number | undefined;
        }, {
            note?: string | undefined;
            service_id?: string | number | undefined;
            id?: string | number | undefined;
            project_id?: string | number | undefined;
            user_id?: string | number | undefined;
            locked?: string | boolean | undefined;
            date_at?: string | undefined;
            minutes?: string | number | undefined;
            time_entry_id?: string | number | undefined;
        }>, {
            note?: string | undefined;
            service_id?: number | undefined;
            id?: number | undefined;
            project_id?: number | undefined;
            user_id?: number | undefined;
            locked?: boolean | undefined;
            date_at?: string | undefined;
            minutes?: number | undefined;
            time_entry_id?: number | undefined;
        }, {
            note?: string | undefined;
            service_id?: string | number | undefined;
            id?: string | number | undefined;
            project_id?: string | number | undefined;
            user_id?: string | number | undefined;
            locked?: string | boolean | undefined;
            date_at?: string | undefined;
            minutes?: string | number | undefined;
            time_entry_id?: string | number | undefined;
        }>;
        execute: (input: z.infer<typeof updateTimeEntrySchema>) => Promise<TimeEntry>;
    };
    deleteTimeEntry: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof deleteTimeEntrySchema>) => Promise<{
            success: boolean;
            id: number;
        }>;
    };
    getTimeEntrySummary: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            group_by: z.ZodEnum<["customer", "project", "service", "user"]>;
            from: z.ZodOptional<z.ZodString>;
            to: z.ZodOptional<z.ZodString>;
            user_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            customer_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
        }, "strip", z.ZodTypeAny, {
            group_by: "customer" | "project" | "service" | "user";
            from?: string | undefined;
            service_id?: number | undefined;
            customer_id?: number | undefined;
            project_id?: number | undefined;
            user_id?: number | undefined;
            to?: string | undefined;
        }, {
            group_by: "customer" | "project" | "service" | "user";
            from?: string | undefined;
            service_id?: string | number | undefined;
            customer_id?: string | number | undefined;
            project_id?: string | number | undefined;
            user_id?: string | number | undefined;
            to?: string | undefined;
        }>;
        execute: (input: z.infer<typeof getTimeEntrySummarySchema>) => Promise<{
            entries: GroupedTimeEntry[];
            grouped: boolean;
            group_by: "customer" | "project" | "service" | "user";
            summary: string;
        }>;
    };
};
export {};
//# sourceMappingURL=time-entries.d.ts.map
import { z } from 'zod';
import type { TimeEntry } from '../types/index.js';
import type { MiteApiClient } from '../utils/api-client.js';
interface StopwatchStatus {
    tracking_time_entry?: TimeEntry & {
        tracking_started_at?: string;
        tracking_since?: string;
    };
    stopped_time_entry?: TimeEntry;
}
declare const startStopwatchSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
declare const stopStopwatchSchema: z.ZodObject<{
    id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string | number;
}>;
declare const quickStartStopwatchSchema: z.ZodObject<{
    note: z.ZodOptional<z.ZodString>;
    project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
    service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
}, "strip", z.ZodTypeAny, {
    note?: string | undefined;
    service_id?: number | undefined;
    project_id?: number | undefined;
}, {
    note?: string | undefined;
    service_id?: string | number | undefined;
    project_id?: string | number | undefined;
}>;
export declare function createStopwatchTools(apiClient: MiteApiClient): {
    getStopwatchStatus: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        execute: () => Promise<StopwatchStatus>;
    };
    startStopwatch: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof startStopwatchSchema>) => Promise<TimeEntry>;
    };
    stopStopwatch: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            id: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
        }, "strip", z.ZodTypeAny, {
            id: number;
        }, {
            id: string | number;
        }>;
        execute: (input: z.infer<typeof stopStopwatchSchema>) => Promise<{
            success: boolean;
            stopped_id: number;
        }>;
    };
    quickStartStopwatch: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            note: z.ZodOptional<z.ZodString>;
            project_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
            service_id: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
        }, "strip", z.ZodTypeAny, {
            note?: string | undefined;
            service_id?: number | undefined;
            project_id?: number | undefined;
        }, {
            note?: string | undefined;
            service_id?: string | number | undefined;
            project_id?: string | number | undefined;
        }>;
        execute: (input: z.infer<typeof quickStartStopwatchSchema>) => Promise<TimeEntry>;
    };
};
export {};
//# sourceMappingURL=stopwatch.d.ts.map
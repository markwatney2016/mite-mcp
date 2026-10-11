"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimeEntriesTools = createTimeEntriesTools;
const zod_1 = require("zod");
const validation_js_1 = require("../utils/validation.js");
const listTimeEntriesSchema = zod_1.z.object({
    user_id: validation_js_1.optionalNumber,
    customer_id: validation_js_1.optionalNumber,
    project_id: validation_js_1.optionalNumber,
    service_id: validation_js_1.optionalNumber,
    from: zod_1.z.string().optional(),
    to: zod_1.z.string().optional(),
    billable: validation_js_1.optionalBoolean,
    locked: validation_js_1.optionalBoolean,
    limit: validation_js_1.optionalNumber,
    page: validation_js_1.optionalNumber,
    group_by: zod_1.z
        .enum(['customer', 'project', 'service', 'user', 'day', 'week', 'month', 'year'])
        .optional(),
});
const createTimeEntrySchema = zod_1.z.object({
    date_at: zod_1.z.string().optional(),
    minutes: validation_js_1.optionalNumber,
    note: zod_1.z.string().optional(),
    user_id: validation_js_1.optionalNumber,
    project_id: validation_js_1.optionalNumber,
    service_id: validation_js_1.optionalNumber,
    locked: validation_js_1.optionalBoolean,
});
const updateTimeEntrySchema = zod_1.z
    .object({
    id: validation_js_1.requiredNumber.optional(),
    time_entry_id: validation_js_1.requiredNumber.optional(),
    date_at: zod_1.z.string().optional(),
    minutes: validation_js_1.optionalNumber,
    note: zod_1.z.string().optional(),
    user_id: validation_js_1.optionalNumber,
    project_id: validation_js_1.optionalNumber,
    service_id: validation_js_1.optionalNumber,
    locked: validation_js_1.optionalBoolean,
})
    .refine(data => data.id || data.time_entry_id, {
    message: "Either 'id' or 'time_entry_id' must be provided",
});
const getDailyTimeEntriesSchema = zod_1.z.object({
    at: zod_1.z.string().optional().describe('Date in YYYY-MM-DD format'),
});
const getTimeEntrySummarySchema = zod_1.z.object({
    group_by: zod_1.z.enum(['customer', 'project', 'service', 'user']),
    from: zod_1.z.string().optional(),
    to: zod_1.z.string().optional(),
    user_id: validation_js_1.optionalNumber,
    customer_id: validation_js_1.optionalNumber,
    project_id: validation_js_1.optionalNumber,
    service_id: validation_js_1.optionalNumber,
});
const getTimeEntrySchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
});
const deleteTimeEntrySchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
});
function createTimeEntriesTools(apiClient) {
    return {
        listTimeEntries: {
            name: 'list_time_entries',
            description: "List time entries with filters. IMPORTANT: Always use specific filters when available (user_id, project_id, customer_id) to avoid large result sets. When a user mentions a specific person, project, or customer, include those IDs as filters. Use getDailyTimeEntries for current user's today entries. To see totals by customer/project/user, use group_by parameter (e.g., group_by: 'customer' or 'project' or 'user').",
            inputSchema: listTimeEntriesSchema,
            execute: async (input) => {
                const { group_by, limit, ...params } = input;
                const path = group_by ? `/time_entries.json?group_by=${group_by}` : '/time_entries.json';
                if (group_by) {
                    const entries = await apiClient.get(path, params);
                    return { entries, grouped: true, group_by };
                }
                else {
                    const effectiveLimit = limit || 500;
                    const queryParams = { ...params, limit: effectiveLimit };
                    const entries = await apiClient.get(path, queryParams);
                    if (entries.length === effectiveLimit) {
                        return {
                            entries,
                            grouped: false,
                            warning: `Result set limited to ${effectiveLimit} entries. Use more specific filters (user_id, project_id, customer_id) to see all relevant entries.`,
                        };
                    }
                    return { entries, grouped: false };
                }
            },
        },
        getDailyTimeEntries: {
            name: 'get_daily_time_entries',
            description: 'Get time entries for today or a specific date for the current user. USE THIS for "my time entries" or when no specific user is mentioned.',
            inputSchema: getDailyTimeEntriesSchema,
            execute: async (input) => {
                const path = '/daily.json';
                const entries = await apiClient.get(path, input.at ? { at: input.at } : undefined);
                return { entries };
            },
        },
        getTimeEntry: {
            name: 'get_time_entry',
            description: 'Get a specific time entry by ID',
            inputSchema: getTimeEntrySchema,
            execute: async (input) => {
                const entry = await apiClient.get(`/time_entries/${input.id}.json`);
                return entry.time_entry;
            },
        },
        createTimeEntry: {
            name: 'create_time_entry',
            description: 'Create a new time entry',
            inputSchema: createTimeEntrySchema,
            execute: async (input) => {
                const response = await apiClient.post('/time_entries.json', {
                    time_entry: input,
                });
                return response.time_entry;
            },
        },
        updateTimeEntry: {
            name: 'update_time_entry',
            description: 'Update an existing time entry',
            inputSchema: updateTimeEntrySchema,
            execute: async (input) => {
                const { id, time_entry_id, ...data } = input;
                const entryId = id || time_entry_id;
                const response = await apiClient.patch(`/time_entries/${entryId}.json`, {
                    time_entry: data,
                });
                return response.time_entry;
            },
        },
        deleteTimeEntry: {
            name: 'delete_time_entry',
            description: 'Delete a time entry',
            inputSchema: deleteTimeEntrySchema,
            execute: async (input) => {
                await apiClient.delete(`/time_entries/${input.id}.json`);
                return { success: true, id: input.id };
            },
        },
        getTimeEntrySummary: {
            name: 'get_time_entry_summary',
            description: 'Get summarized/grouped time entries by customer, project, service, or user. Use this when you need totals or summaries rather than individual entries.',
            inputSchema: getTimeEntrySummarySchema,
            execute: async (input) => {
                const { group_by, ...params } = input;
                const path = `/time_entries.json?group_by=${group_by}`;
                const entries = await apiClient.get(path, params);
                return {
                    entries,
                    grouped: true,
                    group_by,
                    summary: `Time entries grouped by ${group_by}`,
                };
            },
        },
    };
}
//# sourceMappingURL=time-entries.js.map
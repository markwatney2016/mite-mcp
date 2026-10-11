"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStopwatchTools = createStopwatchTools;
const zod_1 = require("zod");
const validation_js_1 = require("../utils/validation.js");
const startStopwatchSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber.describe('ID of the time entry to start tracking'),
});
const stopStopwatchSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber.describe('ID of the time entry that is currently being tracked'),
});
const quickStartStopwatchSchema = zod_1.z.object({
    note: zod_1.z.string().optional(),
    project_id: validation_js_1.optionalNumber,
    service_id: validation_js_1.optionalNumber,
});
function createStopwatchTools(apiClient) {
    return {
        getStopwatchStatus: {
            name: 'get_stopwatch_status',
            description: 'Get the current stopwatch status (running or stopped time entry)',
            inputSchema: zod_1.z.object({}),
            execute: async () => {
                const response = await apiClient.get('/tracker.json');
                return response;
            },
        },
        startStopwatch: {
            name: 'start_stopwatch',
            description: 'Start the stopwatch for a time entry',
            inputSchema: startStopwatchSchema,
            execute: async (input) => {
                const response = await apiClient.patch(`/tracker/${input.id}.json`, {});
                return response.tracking_time_entry;
            },
        },
        stopStopwatch: {
            name: 'stop_stopwatch',
            description: 'Stop the currently running stopwatch',
            inputSchema: stopStopwatchSchema,
            execute: async (input) => {
                await apiClient.delete(`/tracker/${input.id}.json`);
                return { success: true, stopped_id: input.id };
            },
        },
        quickStartStopwatch: {
            name: 'quick_start_stopwatch',
            description: 'Start stopwatch with a new time entry for today',
            inputSchema: quickStartStopwatchSchema,
            execute: async (input) => {
                const timeEntry = await apiClient.post('/time_entries.json', {
                    time_entry: {
                        date_at: new Date().toISOString().split('T')[0],
                        minutes: 0,
                        ...input,
                    },
                });
                const tracking = await apiClient.patch(`/tracker/${timeEntry.time_entry.id}.json`, {});
                return tracking.tracking_time_entry;
            },
        },
    };
}
//# sourceMappingURL=stopwatch.js.map
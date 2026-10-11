"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServicesTools = createServicesTools;
const zod_1 = require("zod");
const validation_js_1 = require("../utils/validation.js");
const listServicesSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    limit: validation_js_1.optionalNumber,
    page: validation_js_1.optionalNumber,
    archived: validation_js_1.optionalBoolean,
});
const createServiceSchema = zod_1.z.object({
    name: zod_1.z.string(),
    note: zod_1.z.string().optional(),
    hourly_rate: validation_js_1.optionalNumber,
    billable: validation_js_1.optionalBoolean,
    archived: validation_js_1.optionalBoolean,
});
const updateServiceSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
    name: zod_1.z.string().optional(),
    note: zod_1.z.string().optional(),
    hourly_rate: validation_js_1.optionalNumber,
    billable: validation_js_1.optionalBoolean,
    archived: validation_js_1.optionalBoolean,
    update_hourly_rate_on_time_entries: validation_js_1.optionalBoolean,
});
const getServiceSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
});
const deleteServiceSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
});
function createServicesTools(apiClient) {
    return {
        listServices: {
            name: 'list_services',
            description: 'List active or archived services',
            inputSchema: listServicesSchema,
            execute: async (input) => {
                const { archived, ...params } = input;
                const path = archived ? '/services/archived.json' : '/services.json';
                const services = await apiClient.get(path, params);
                return { services };
            },
        },
        getService: {
            name: 'get_service',
            description: 'Get a specific service by ID',
            inputSchema: getServiceSchema,
            execute: async (input) => {
                const response = await apiClient.get(`/services/${input.id}.json`);
                return response.service;
            },
        },
        createService: {
            name: 'create_service',
            description: 'Create a new service (requires admin permissions)',
            inputSchema: createServiceSchema,
            execute: async (input) => {
                const response = await apiClient.post('/services.json', {
                    service: input,
                });
                return response.service;
            },
        },
        updateService: {
            name: 'update_service',
            description: 'Update an existing service (requires admin permissions)',
            inputSchema: updateServiceSchema,
            execute: async (input) => {
                const { id, ...data } = input;
                const response = await apiClient.patch(`/services/${id}.json`, {
                    service: data,
                });
                return response.service;
            },
        },
        deleteService: {
            name: 'delete_service',
            description: 'Delete a service (requires admin permissions, service must have no time entries)',
            inputSchema: deleteServiceSchema,
            execute: async (input) => {
                await apiClient.delete(`/services/${input.id}.json`);
                return { success: true, id: input.id };
            },
        },
    };
}
//# sourceMappingURL=services.js.map
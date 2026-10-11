"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomersTools = createCustomersTools;
const zod_1 = require("zod");
const validation_js_1 = require("../utils/validation.js");
const listCustomersSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    limit: validation_js_1.optionalNumber,
    page: validation_js_1.optionalNumber,
    archived: validation_js_1.optionalBoolean,
});
const createCustomerSchema = zod_1.z.object({
    name: zod_1.z.string(),
    note: zod_1.z.string().optional(),
    archived: validation_js_1.optionalBoolean,
    hourly_rate: validation_js_1.optionalNumber,
    hourly_rates_per_service: zod_1.z
        .array(zod_1.z.object({
        service_id: validation_js_1.requiredNumber,
        hourly_rate: validation_js_1.requiredNumber,
    }))
        .optional(),
});
const updateCustomerSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
    name: zod_1.z.string().optional(),
    note: zod_1.z.string().optional(),
    archived: validation_js_1.optionalBoolean,
    hourly_rate: validation_js_1.optionalNumber,
    hourly_rates_per_service: zod_1.z
        .array(zod_1.z.object({
        service_id: validation_js_1.requiredNumber,
        hourly_rate: validation_js_1.requiredNumber,
    }))
        .optional(),
});
const getCustomerSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
});
const deleteCustomerSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
});
function createCustomersTools(apiClient) {
    return {
        listCustomers: {
            name: 'list_customers',
            description: 'List active or archived customers',
            inputSchema: listCustomersSchema,
            execute: async (input) => {
                const { archived, ...params } = input;
                const path = archived ? '/customers/archived.json' : '/customers.json';
                const customers = await apiClient.get(path, params);
                return { customers };
            },
        },
        getCustomer: {
            name: 'get_customer',
            description: 'Get a specific customer by ID',
            inputSchema: getCustomerSchema,
            execute: async (input) => {
                const response = await apiClient.get(`/customers/${input.id}.json`);
                return response.customer;
            },
        },
        createCustomer: {
            name: 'create_customer',
            description: 'Create a new customer (requires admin permissions)',
            inputSchema: createCustomerSchema,
            execute: async (input) => {
                const response = await apiClient.post('/customers.json', {
                    customer: input,
                });
                return response.customer;
            },
        },
        updateCustomer: {
            name: 'update_customer',
            description: 'Update an existing customer (requires admin permissions)',
            inputSchema: updateCustomerSchema,
            execute: async (input) => {
                const { id, ...data } = input;
                const response = await apiClient.patch(`/customers/${id}.json`, {
                    customer: data,
                });
                return response.customer;
            },
        },
        deleteCustomer: {
            name: 'delete_customer',
            description: 'Delete a customer (requires admin permissions, customer must have no projects)',
            inputSchema: deleteCustomerSchema,
            execute: async (input) => {
                await apiClient.delete(`/customers/${input.id}.json`);
                return { success: true, id: input.id };
            },
        },
    };
}
//# sourceMappingURL=customers.js.map
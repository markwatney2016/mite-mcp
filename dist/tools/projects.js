"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectsTools = createProjectsTools;
const zod_1 = require("zod");
const validation_js_1 = require("../utils/validation.js");
const listProjectsSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    customer_id: validation_js_1.optionalNumber,
    limit: validation_js_1.optionalNumber,
    page: validation_js_1.optionalNumber,
    archived: validation_js_1.optionalBoolean,
});
const createProjectSchema = zod_1.z.object({
    name: zod_1.z.string(),
    note: zod_1.z.string().optional(),
    customer_id: validation_js_1.optionalNumber,
    budget: validation_js_1.optionalNumber,
    budget_type: zod_1.z.string().optional(),
    archived: validation_js_1.optionalBoolean,
    hourly_rate: validation_js_1.optionalNumber,
    hourly_rates_per_service: zod_1.z
        .array(zod_1.z.object({
        service_id: validation_js_1.requiredNumber,
        hourly_rate: validation_js_1.requiredNumber,
    }))
        .optional(),
});
const updateProjectSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
    name: zod_1.z.string().optional(),
    note: zod_1.z.string().optional(),
    customer_id: validation_js_1.optionalNumber,
    budget: validation_js_1.optionalNumber,
    budget_type: zod_1.z.string().optional(),
    archived: validation_js_1.optionalBoolean,
    hourly_rate: validation_js_1.optionalNumber,
    hourly_rates_per_service: zod_1.z
        .array(zod_1.z.object({
        service_id: validation_js_1.requiredNumber,
        hourly_rate: validation_js_1.requiredNumber,
    }))
        .optional(),
    update_hourly_rate_on_time_entries: validation_js_1.optionalBoolean,
});
const getProjectSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
});
const deleteProjectSchema = zod_1.z.object({
    id: validation_js_1.requiredNumber,
});
function createProjectsTools(apiClient) {
    return {
        listProjects: {
            name: 'list_projects',
            description: 'List active or archived projects',
            inputSchema: listProjectsSchema,
            execute: async (input) => {
                const { archived, ...params } = input;
                const path = archived ? '/projects/archived.json' : '/projects.json';
                const projects = await apiClient.get(path, params);
                return { projects };
            },
        },
        getProject: {
            name: 'get_project',
            description: 'Get a specific project by ID',
            inputSchema: getProjectSchema,
            execute: async (input) => {
                const response = await apiClient.get(`/projects/${input.id}.json`);
                return response.project;
            },
        },
        createProject: {
            name: 'create_project',
            description: 'Create a new project (requires admin permissions)',
            inputSchema: createProjectSchema,
            execute: async (input) => {
                const response = await apiClient.post('/projects.json', {
                    project: input,
                });
                return response.project;
            },
        },
        updateProject: {
            name: 'update_project',
            description: 'Update an existing project (requires admin permissions)',
            inputSchema: updateProjectSchema,
            execute: async (input) => {
                const { id, ...data } = input;
                const response = await apiClient.patch(`/projects/${id}.json`, {
                    project: data,
                });
                return response.project;
            },
        },
        deleteProject: {
            name: 'delete_project',
            description: 'Delete a project (requires admin permissions, project must have no time entries)',
            inputSchema: deleteProjectSchema,
            execute: async (input) => {
                await apiClient.delete(`/projects/${input.id}.json`);
                return { success: true, id: input.id };
            },
        },
    };
}
//# sourceMappingURL=projects.js.map
#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const node_http_1 = require("node:http");
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const commander_1 = require("commander");
const zod_1 = require("zod");
const customers_js_1 = require("./tools/customers.js");
const projects_js_1 = require("./tools/projects.js");
const services_js_1 = require("./tools/services.js");
const stopwatch_js_1 = require("./tools/stopwatch.js");
const time_entries_js_1 = require("./tools/time-entries.js");
const api_client_js_1 = require("./utils/api-client.js");
const config_js_1 = require("./utils/config.js");
const READ_ONLY_TOOLS = new Set([
    'get_customer',
    'get_daily_time_entries',
    'get_project',
    'get_service',
    'get_stopwatch_status',
    'get_time_entry',
    'get_time_entry_summary',
    'list_customers',
    'list_projects',
    'list_services',
    'list_time_entries',
]);
async function setupServer(apiClient) {
    const server = new index_js_1.Server({
        name: 'mite-mcp',
        version: '0.1.2',
    }, {
        capabilities: {
            tools: {},
        },
    });
    const timeEntriesTools = (0, time_entries_js_1.createTimeEntriesTools)(apiClient);
    const customersTools = (0, customers_js_1.createCustomersTools)(apiClient);
    const projectsTools = (0, projects_js_1.createProjectsTools)(apiClient);
    const servicesTools = (0, services_js_1.createServicesTools)(apiClient);
    const stopwatchTools = (0, stopwatch_js_1.createStopwatchTools)(apiClient);
    const allTools = Object.fromEntries(Object.entries({
        ...timeEntriesTools,
        ...customersTools,
        ...projectsTools,
        ...servicesTools,
        ...stopwatchTools,
    }).filter(([, tool]) => READ_ONLY_TOOLS.has(tool.name)));
    const toolsByName = new Map();
    Object.values(allTools).forEach(tool => {
        toolsByName.set(tool.name, tool);
    });
    server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => ({
        tools: Object.entries(allTools).map(([_, tool]) => ({
            name: tool.name,
            description: tool.description,
            inputSchema: {
                type: 'object',
                properties: {},
                additionalProperties: true,
            },
        })),
    }));
    server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        const tool = toolsByName.get(name);
        if (!tool) {
            throw new Error(`Tool ${name} not found`);
        }
        try {
            const validatedInput = tool.inputSchema.parse(args || {});
            const result = await tool.execute(validatedInput);
            return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                throw new Error(`Invalid input: ${error.errors.map(e => e.message).join(', ')}`);
            }
            throw error;
        }
    });
    return server;
}
async function runStdioServer(server) {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error('mite MCP server running on stdio');
}
async function runHttpServer(server, options) {
    const httpServer = (0, node_http_1.createServer)();
    const transports = new Map();
    httpServer.on('request', async (req, res) => {
        if (!req.url) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request');
            return;
        }
        const url = new URL(req.url, `http://${req.headers.host}`);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Mcp-Session-Id');
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        if (url.pathname === '/' || url.pathname === '/mcp') {
            if (req.method === 'POST') {
                const sessionId = req.headers['mcp-session-id'];
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    try {
                        const parsedBody = JSON.parse(body);
                        let transport;
                        if (sessionId && transports.has(sessionId)) {
                            const existingTransport = transports.get(sessionId);
                            if (!existingTransport) {
                                throw new Error('Transport not found');
                            }
                            transport = existingTransport;
                        }
                        else if (!sessionId && parsedBody.method === 'initialize') {
                            transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
                                sessionIdGenerator: () => (0, node_crypto_1.randomUUID)(),
                                onsessioninitialized: (sessionId) => {
                                    transports.set(sessionId, transport);
                                    console.error(`Session initialized with ID: ${sessionId}`);
                                },
                                enableDnsRebindingProtection: true,
                                allowedHosts: [
                                    options.host,
                                    'localhost',
                                    '127.0.0.1',
                                    `${options.host}:${options.port}`,
                                    `localhost:${options.port}`,
                                    `127.0.0.1:${options.port}`,
                                ],
                            });
                            transport.onclose = () => {
                                if (transport.sessionId) {
                                    transports.delete(transport.sessionId);
                                    console.error(`Session closed: ${transport.sessionId}`);
                                }
                            };
                            await server.connect(transport);
                        }
                        else {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({
                                jsonrpc: '2.0',
                                error: {
                                    code: -32000,
                                    message: 'Bad Request: No valid session ID provided',
                                },
                                id: null,
                            }));
                            return;
                        }
                        await transport.handleRequest(req, res, parsedBody);
                    }
                    catch (error) {
                        console.error('Error handling MCP request:', error);
                        if (!res.headersSent) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({
                                jsonrpc: '2.0',
                                error: {
                                    code: -32603,
                                    message: 'Internal server error',
                                },
                                id: null,
                            }));
                        }
                    }
                });
            }
            else if (req.method === 'GET') {
                const sessionId = req.headers['mcp-session-id'];
                if (!sessionId || !transports.has(sessionId)) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid or missing session ID');
                    return;
                }
                const transport = transports.get(sessionId);
                if (!transport) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Transport not found');
                    return;
                }
                await transport.handleRequest(req, res);
            }
            else if (req.method === 'DELETE') {
                const sessionId = req.headers['mcp-session-id'];
                if (!sessionId || !transports.has(sessionId)) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid or missing session ID');
                    return;
                }
                const transport = transports.get(sessionId);
                if (!transport) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Transport not found');
                    return;
                }
                await transport.handleRequest(req, res);
            }
            else {
                res.writeHead(405, { 'Content-Type': 'text/plain' });
                res.end('Method Not Allowed');
            }
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });
    httpServer.listen(options.port, options.host, () => {
        console.error(`mite MCP server running on HTTP at http://${options.host}:${options.port}`);
        console.error(`Connect via Streamable HTTP at: http://${options.host}:${options.port}/`);
    });
}
async function loadEnvironment() {
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        try {
            const originalWrite = process.stdout.write;
            process.stdout.write = () => true;
            const dotenv = await Promise.resolve().then(() => __importStar(require('dotenv')));
            dotenv.config();
            process.stdout.write = originalWrite;
        }
        catch {
        }
    }
    else if (process.env.NODE_ENV === 'test') {
        try {
            const dotenv = await Promise.resolve().then(() => __importStar(require('dotenv')));
            dotenv.config();
        }
        catch {
        }
    }
}
async function main() {
    const program = new commander_1.Command();
    program
        .name('mite-mcp')
        .description('mite MCP server - Model Context Protocol server for mite time tracking')
        .version('0.1.2');
    program
        .option('--stdio', 'Run in stdio mode (default)')
        .option('--http', 'Run in HTTP/Streamable mode')
        .option('-p, --port <port>', 'Port for HTTP server', '3000')
        .option('-h, --host <host>', 'Host for HTTP server', 'localhost')
        .parse();
    const opts = program.opts();
    const options = {
        mode: opts.http ? 'http' : 'stdio',
        port: parseInt(opts.port),
        host: opts.host,
    };
    await loadEnvironment();
    let config;
    let apiClient;
    try {
        config = (0, config_js_1.getConfigFromEnv)();
        apiClient = new api_client_js_1.MiteApiClient(config);
    }
    catch (error) {
        console.error('Configuration error:', error instanceof Error ? error.message : String(error));
        console.error('\nPlease set the following environment variables:');
        console.error('  MITE_ACCOUNT_NAME: Your mite account name (required)');
        console.error('  MITE_API_KEY: Your mite API key (recommended)');
        console.error('  OR');
        console.error('  MITE_EMAIL: Your mite email');
        console.error('  MITE_PASSWORD: Your mite password');
        process.exit(1);
    }
    const server = await setupServer(apiClient);
    if (options.mode === 'http') {
        await runHttpServer(server, options);
    }
    else {
        await runStdioServer(server);
    }
}
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map
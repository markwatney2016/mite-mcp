"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = validateConfig;
exports.getConfigFromEnv = getConfigFromEnv;
const zod_1 = require("zod");
const miteConfigSchema = zod_1.z
    .object({
    accountName: zod_1.z.string().min(1, 'Account name is required'),
    apiKey: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().optional(),
})
    .refine(data => data.apiKey || (data.email && data.password), {
    message: 'Either API key or email/password combination is required',
});
function validateConfig(config) {
    return miteConfigSchema.parse(config);
}
function getConfigFromEnv() {
    const config = {
        accountName: process.env.MITE_ACCOUNT_NAME || '',
        apiKey: process.env.MITE_API_KEY,
        email: process.env.MITE_EMAIL,
        password: process.env.MITE_PASSWORD,
    };
    return validateConfig(config);
}
//# sourceMappingURL=config.js.map
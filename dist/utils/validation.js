"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredBoolean = exports.optionalBoolean = exports.requiredNumber = exports.optionalNumber = void 0;
const zod_1 = require("zod");
exports.optionalNumber = zod_1.z
    .union([
    zod_1.z.number(),
    zod_1.z.string().transform(val => {
        if (val === '' || val === null || val === undefined)
            return undefined;
        const num = Number(val);
        if (Number.isNaN(num))
            throw new Error(`Invalid number: "${val}"`);
        return num;
    }),
])
    .optional();
exports.requiredNumber = zod_1.z.union([
    zod_1.z.number(),
    zod_1.z.string().transform(val => {
        const num = Number(val);
        if (Number.isNaN(num))
            throw new Error(`Invalid number: "${val}"`);
        return num;
    }),
]);
exports.optionalBoolean = zod_1.z
    .union([
    zod_1.z.boolean(),
    zod_1.z.string().transform(val => {
        if (val === '' || val === null || val === undefined)
            return undefined;
        if (val === 'true' || val === '1')
            return true;
        if (val === 'false' || val === '0')
            return false;
        throw new Error(`Invalid boolean: "${val}"`);
    }),
])
    .optional();
exports.requiredBoolean = zod_1.z.union([
    zod_1.z.boolean(),
    zod_1.z.string().transform(val => {
        if (val === 'true' || val === '1')
            return true;
        if (val === 'false' || val === '0')
            return false;
        throw new Error(`Invalid boolean: "${val}"`);
    }),
]);
//# sourceMappingURL=validation.js.map
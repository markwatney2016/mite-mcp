import { z } from 'zod';
export declare const optionalNumber: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number | undefined, string>]>>;
export declare const requiredNumber: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>;
export declare const optionalBoolean: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean | undefined, string>]>>;
export declare const requiredBoolean: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodString, boolean, string>]>;
//# sourceMappingURL=validation.d.ts.map
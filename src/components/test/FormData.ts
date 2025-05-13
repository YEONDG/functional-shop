import { z, ZodType } from 'zod';

export type MyFormData = {
  myfield?: {
    name: string;
    text?: string;
  }[];
};

export const FormDataSchema: ZodType<MyFormData> = z.object({
  myfield: z
    .array(
      z.object({
        name: z
          .string({
            required_error: 'Name is required',
          })
          .min(1, 'name is required'),
        text: z.string().optional(),
      })
    )
    .optional(),
});

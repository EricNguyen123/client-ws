import z from 'zod'

export const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export const FormAddBannerSchema = z.object({
  image: z.instanceof(File)
          .refine((file) => file.size > 0, {
            message: "Image file is required.",
          })
          .refine((file) => file.type.startsWith("image/"), {
            message: "Only image files are allowed.",
          }),
  descriptions: z.string().refine((text) => text.trim() !== "", {
    message: "Description is required.",
  }),
  orderNumber: z.string().min(1, "Order Number is required."),
  startDate: z.date().refine((date) => date >= new Date(), {
    message: "Start date must be greater than or equal to now date.",
  }),
  endDate: z.date(),
}).superRefine((data, ctx) => {
  if (data.endDate < data.startDate) {
    ctx.addIssue({
      path: ["endDate"],
      message: "End date must be greater than or equal to start date.",
      code: z.ZodIssueCode.custom,
    });
  }
});

export const FormEditBannerSchema = z.object({
  image: z.instanceof(File).optional(),
  descriptions: z.string().refine((text) => text.trim() !== "", {
    message: "Description is required.",
  }),
  orderNumber: z.string().min(1, "Order Number is required."),
  startDate: z.date().refine((date) => date >= new Date(), {
    message: "Start date must be greater than or equal to now date.",
  }),
  endDate: z.date(),
}).superRefine((data, ctx) => {
  if (data.endDate < data.startDate) {
    ctx.addIssue({
      path: ["endDate"],
      message: "End date must be greater than or equal to start date.",
      code: z.ZodIssueCode.custom,
    });
  }
});

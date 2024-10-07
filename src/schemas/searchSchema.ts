import { z } from "zod";

export type ShoeBrand = (typeof SHOE_BRANDS)[number];
export const SHOE_BRANDS = ["Adidas", "Asics", "Hoka", "Nike"] as const;

export type SearchParams = z.infer<typeof searchSchema>;
export const searchSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1).catch(1),
  limit: z.coerce.number().int().min(1).optional().default(3).catch(3),
  query: z.string().optional().default("").catch(""),
  brand: z
    .enum(["ALL", ...SHOE_BRANDS])
    .optional()
    .default("ALL")
    .catch("ALL"),
});

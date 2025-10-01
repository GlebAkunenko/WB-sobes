import { z } from "zod";

export const BoxSchema = z.object({
    id: z.bigint(),
    createdAt: z.date(),
    boxDeliveryBase: z.string(),
    boxDeliveryCoefExpr: z.string(),
    boxDeliveryLiter: z.string(),
    boxDeliveryMarketplaceBase: z.string(),
    boxDeliveryMarketplaceCoefExpr: z.string(),
    boxDeliveryMarketplaceLiter: z.string(),
    boxStorageBase: z.string(),
    boxStorageCoefExpr: z.string(),
    boxStorageLiter: z.string(),
    geoName: z.string(),
    warehouseName: z.string(),
});

export type Box = z.infer<typeof BoxSchema>;

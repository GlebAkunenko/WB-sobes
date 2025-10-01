import { z } from "zod";
import { BoxDtoSchema } from "#model/BoxDto.js";

const dateOrNull = z.preprocess((arg) => {
    if (typeof arg === "string") {
        return arg.trim() === "" ? null : new Date(arg);
    }
    return arg;
}, z.date().nullable());

export const WarehousesBoxRatesDtoSchema = z.object({
    dtNextBox: dateOrNull,
    dtTillMax: dateOrNull,
    warehouseList: z.array(BoxDtoSchema),
});

export type WarehousesBoxRatesDto = z.infer<typeof WarehousesBoxRatesDtoSchema>;

import { db } from "#db.js";
import { BoxDto, BoxDtoSchema } from "#model/BoxDto.js";
import { Box, BoxSchema } from "#model/Box.js";

export async function saveBoxRecord(data: BoxDto, atTime: Date): Promise<void> {
    const parsed = BoxDtoSchema.parse(data);
    const toInsert = { ...parsed, createdAt: new Date() };
    await db<Box>("box_records").insert(toInsert);
}

export async function saveBoxRecords(data: Array<BoxDto>, atTime: Date): Promise<void> {
    const parsed = data.map((dto) => {
        const validated = BoxDtoSchema.parse(dto);
        return { ...validated, created_at: atTime };
    });

    await db<Box>("box_records").insert(parsed);
}

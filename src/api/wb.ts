import axios from "axios";
import { WarehousesBoxRatesDto, WarehousesBoxRatesDtoSchema } from "#model/WarehousesBoxRatesDto.js";
import { format } from "date-fns";
import env from "#config/env/env.js";

export async function fetchBoxTariffs(date: Date): Promise<WarehousesBoxRatesDto> {
    const url = `${env.WB_API_BASE_URL}/tariffs/box?date=${format(date, "yyyy-MM-dd")}`;
    const result = await axios.get(url, {
        headers: {
            "Authorization": env.WB_TOKEN,
            "Accept": "application/json",
        },
    });
    if (result.status === 200) {
        return WarehousesBoxRatesDtoSchema.parse(result.data.response.data);
    } else {
        throw result.data.detail;
    }
}

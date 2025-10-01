import axios from "axios";
import { WarehousesBoxRatesDto, WarehousesBoxRatesDtoSchema } from "#model/WarehousesBoxRatesDto.js";
import env from "#config/env/env.js";
import { Moment } from "moment-timezone";

export async function fetchBoxTariffs(date: Moment): Promise<WarehousesBoxRatesDto> {
    const url = `${env.WB_API_BASE_URL}/tariffs/box?date=${date.format("YYYY-MM-DD")}`;
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

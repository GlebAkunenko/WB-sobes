import knex, { migrate, seed } from "#postgres/knex.js";
import { fetchBoxTariffs } from "#api/wb.js";
import { WarehousesBoxRatesDto } from "#model/WarehousesBoxRatesDto.js";
import { saveBoxRecords } from "#repositories/BoxRepository.js";

await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");

const r: WarehousesBoxRatesDto = await fetchBoxTariffs(new Date());
await saveBoxRecords(r.warehouseList, new Date());

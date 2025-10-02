import knex, { migrate, seed } from "#postgres/knex.js";
import { fetchBoxTariffs } from "#api/wb.js";
import { saveBoxRecords } from "#repositories/BoxRepository.js";
import { writeBoxData } from "#api/googleSheets.js";
import cron from "node-cron";
import moment from "moment-timezone";

await migrate.latest();
await seed.run();

async function update() {
    try {
        const now = moment().tz("Europe/Moscow");
        const response = await fetchBoxTariffs(now);
        await saveBoxRecords(response.warehouseList, now.toDate());
        await writeBoxData(response.warehouseList);
    } catch (err) {
        if (err instanceof Error) console.error("Error: ", err.message);
        else console.error("Unknown error: ", err);
    }
}

cron.schedule("0 * * * *", () => {
    update();
});

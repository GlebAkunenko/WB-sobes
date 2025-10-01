import { google } from "googleapis";
import env from "#config/env/env.js";
import { BoxDto } from "#model/BoxDto.js";
import moment from "moment-timezone";

async function getSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "google-sheets-api-key.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
}

function getRange(n: number, m: number) {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    if (m - 1 < letters.length) {
        return `${env.SHEET_PAGE_NAME}!A3:${letters[m - 1]}${n + 2}`;
    } else {
        throw Error("To many data");
    }
}

export async function writeSheet(data: Array<Array<any>>) {
    if (data.length == 0) {
        return;
    }

    const sheets = await getSheetsClient();
    const spreadsheetId = env.SHEET_ID;

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: getRange(data.length, Math.max(...data.map((d) => d.length))),
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: data,
        },
    });

    const moscowTime = moment().tz("Europe/Moscow");
    console.log(moscowTime.format("DD.MM.YYYY HH:mm:ss"));
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${env.SHEET_PAGE_NAME}!D1:D1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[moscowTime.format("DD.MM.YYYY HH:mm:ss")]],
        },
    });
}

export async function whiteBoxData(data: Array<BoxDto>) {
    const records = data.map((d) => {
        return [
            d.warehouseName,
            d.geoName,
            d.boxDeliveryBase,
            d.boxDeliveryCoefExpr,
            d.boxDeliveryLiter,
            d.boxDeliveryMarketplaceBase,
            d.boxDeliveryCoefExpr,
            d.boxDeliveryMarketplaceLiter,
            d.boxStorageBase,
            d.boxStorageCoefExpr,
            d.boxStorageLiter,
        ];
    });
    await writeSheet(records);
}

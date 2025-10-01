import { z } from "zod";

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("box_records", (table) => {
        table.increments("id").primary();
        table.date("created_at").notNullable();
        table.string("boxDeliveryBase").notNullable();
        table.string("boxDeliveryCoefExpr").notNullable();
        table.string("boxDeliveryLiter").notNullable();
        table.string("boxDeliveryMarketplaceBase").notNullable();
        table.string("boxDeliveryMarketplaceCoefExpr").notNullable();
        table.string("boxDeliveryMarketplaceLiter").notNullable();
        table.string("boxStorageBase").notNullable();
        table.string("boxStorageCoefExpr").notNullable();
        table.string("boxStorageLiter").notNullable();
        table.string("geoName").notNullable();
        table.string("warehouseName").notNullable();
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("box_records");
}

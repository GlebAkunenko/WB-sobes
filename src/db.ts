import knex, { Knex } from "knex";
import knexfile from "#config/knex/knexfile.js";

export const db: Knex = knex(knexfile);

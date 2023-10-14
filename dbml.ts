/*pragma type: "lib"*/
import { mysqlGenerate } from "drizzle-dbml-generator";
import * as schema from "./src/lib/db/schema/index";

const out = "./schema.dbml";
const relational = true;

mysqlGenerate({ schema, out, relational });

export {};

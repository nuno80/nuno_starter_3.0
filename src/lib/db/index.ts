// src/lib/db/index.ts
import Database, { type Database as DBType } from "better-sqlite3";
import fs from "fs";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var __db: DBType | undefined;
}

const projectRoot = process.cwd();
const dbDir = path.join(projectRoot, "database");
const dbPath = path.join(dbDir, "starter_default.db");
const schemaPath = path.join(dbDir, "schema.sql");

function initializeDatabase(): DBType {
  // console.log("[DB_INIT] InitializeDatabase called.");
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
    } catch (error) {
      console.error(
        `[DB_INIT] CRITICAL: Failed to create database directory ${dbDir}:`,
        error
      );
      throw new Error(`Failed to create database directory: ${error}`);
    }
  }

  const dbFileExistedBeforeConnection = fs.existsSync(dbPath);
  let instance: DBType;

  try {
    instance = new Database(dbPath, {
      timeout: 10000 /* 10 secondi timeout */,
    });
    instance.pragma("journal_mode = WAL");
    // console.log(`[DB_INIT] Connected to/created database at: ${dbPath}. WAL mode enabled.`);

    if (!dbFileExistedBeforeConnection) {
      console.log(
        `Nuovo database "${path.basename(dbPath)}" creato. Tentativo di applicare lo schema da ${schemaPath}.`
      );
      if (fs.existsSync(schemaPath)) {
        try {
          const schemaSql = fs.readFileSync(schemaPath, "utf8");
          if (schemaSql.trim() !== "") {
            instance.exec(schemaSql);
            console.log("Schema SQL applicato con successo.");
          } else {
            console.log(`File schema.sql (${schemaPath}) trovato ma è vuoto.`);
          }
        } catch (schemaError) {
          console.error(
            `Errore durante l'applicazione dello schema SQL da ${schemaPath}:`,
            schemaError
          );
        }
      } else {
        console.warn(`File schema.sql non trovato in ${schemaPath}.`);
      }
    }
  } catch (error) {
    console.error(
      "[DB_INIT] CRITICAL: Failed to connect to SQLite database:",
      error
    );
    throw new Error(`Failed to initialize SQLite database: ${error}`);
  }
  return instance;
}

let db: DBType;

if (process.env.NODE_ENV === "production") {
  db = initializeDatabase();
} else {
  if (!global.__db) {
    global.__db = initializeDatabase();
  }
  db = global.__db;
}

export { db };

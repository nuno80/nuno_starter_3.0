// src/lib/db/index.ts (Versione Connettore Minimale)
import Database, { type Database as DBType } from "better-sqlite3";
import fs from "fs";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var __db_connection: DBType | undefined; // Nome diverso per evitare conflitti se avevi __db
}

const projectRoot = process.cwd();
const dbDir = path.join(projectRoot, "database");
const dbPath = path.join(dbDir, "starter_default.db");

function initializeDatabaseConnection(): DBType {
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log(`[DB Connection] Created database directory: ${dbDir}`);
    } catch (error) {
      console.error(
        `[DB Connection] CRITICAL: Failed to create database directory ${dbDir}:`,
        error
      );
      throw new Error(`Failed to create database directory: ${error}`);
    }
  }

  let instance: DBType;
  try {
    instance = new Database(dbPath, {
      timeout: 10000 /* 10 secondi timeout */,
    });
    instance.pragma("journal_mode = WAL");
    console.log(
      `[DB Connection] Established connection to database at: ${dbPath}. WAL mode enabled.`
    );
  } catch (error) {
    console.error(
      "[DB Connection] CRITICAL: Failed to connect to SQLite database:",
      error
    );
    throw new Error(
      `Failed to initialize SQLite database connection: ${error}`
    );
  }
  return instance;
}

let db: DBType;

if (process.env.NODE_ENV === "production") {
  db = initializeDatabaseConnection();
} else {
  if (!global.__db_connection) {
    global.__db_connection = initializeDatabaseConnection();
  }
  db = global.__db_connection;
}

export { db };

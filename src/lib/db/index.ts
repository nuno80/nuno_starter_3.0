// src/lib/db/index.ts
import Database, { type Database as DBType } from "better-sqlite3";
import fs from "fs";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var __db_connection: DBType | undefined;
}

const projectRoot = process.cwd();
const dbDir = path.join(projectRoot, "database");
const dbPath = path.join(dbDir, "starter_default.db");

function initializeDatabaseConnection(): DBType {
  console.log("[DB Connection] initializeDatabaseConnection called.");
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
    console.log(
      `[DB Connection] Attempting to connect to/create SQLite database at: ${dbPath}`
    );
    instance = new Database(dbPath, { timeout: 10000 });
    instance.pragma("journal_mode = WAL");
    console.log(
      `[DB Connection] Connection to database at: ${dbPath} established. WAL mode enabled.`
    );
    // La logica per applicare schema.sql è stata rimossa da qui.
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
    console.log(
      "[DB Connection] Creating new DB connection for development (or first load)."
    );
    global.__db_connection = initializeDatabaseConnection();
  } else {
    console.log(
      "[DB Connection] Reusing existing DB connection for development (HMR)."
    );
  }
  db = global.__db_connection;
}

export const closeDbConnection = () => {
  if (global.__db_connection && global.__db_connection.open) {
    console.log("[DB Connection] Closing DEV database connection.");
    global.__db_connection.close();
    global.__db_connection = undefined;
  } else if (db && db.open && process.env.NODE_ENV === "production") {
    console.log("[DB Connection] Closing PROD database connection.");
    db.close();
  }
};

export { db };

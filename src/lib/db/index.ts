// src/lib/db/index.ts
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

console.log('[DB_INIT] Starting database initialization...'); // Log iniziale del modulo

const projectRoot = process.cwd();
console.log(`[DB_INIT] Project root (process.cwd()): ${projectRoot}`);

const dbDir = path.join(projectRoot, 'database');
const dbPath = path.join(dbDir, 'fantacalcio_dev.db');

console.log(`[DB_INIT] Expected database directory: ${dbDir}`);
console.log(`[DB_INIT] Expected database file path: ${dbPath}`);

// Assicurati che la directory del database esista
// La condizione NODE_ENV non è strettamente necessaria se vogliamo sempre creare la dir
if (!fs.existsSync(dbDir)) {
  console.log(`[DB_INIT] Database directory ${dbDir} does not exist. Attempting to create...`);
  try {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log(`[DB_INIT] Successfully created database directory: ${dbDir}`);
  } catch (error) {
    console.error(`[DB_INIT] CRITICAL: Failed to create database directory ${dbDir}:`, error);
    // Potrebbe essere utile lanciare un errore qui per fermare l'app se la dir non può essere creata
  }
} else {
  console.log(`[DB_INIT] Database directory ${dbDir} already exists.`);
}

let dbInstance: Database.Database;

try {
  console.log(`[DB_INIT] Attempting to connect to/create SQLite database at: ${dbPath}`);
  // better-sqlite3 crea il file se non esiste quando si apre la connessione
  dbInstance = new Database(dbPath, { verbose: (message: unknown, ...additionalArgs: unknown[]) => console.log('[BETTER-SQLITE3]', message, ...additionalArgs) });
  console.log(`[DB_INIT] Successfully connected to/created SQLite database: ${dbPath}`);
  console.log(`[DB_INIT] Database file exists on disk: ${fs.existsSync(dbPath)}`);

  // Abilita WAL mode per migliori performance e concorrenza
  dbInstance.pragma('journal_mode = WAL');
  console.log('[DB_INIT] WAL mode enabled.');

} catch (error) {
  console.error('[DB_INIT] CRITICAL: Failed to connect to SQLite database:', error);
  // È importante che l'applicazione non continui se il DB non è disponibile.
  throw new Error(`Failed to initialize SQLite database: ${error}`);
}

// Esporta l'istanza del database per essere usata in altre parti dell'applicazione
export const db = dbInstance;

// Funzione di utility per chiudere la connessione (utile per graceful shutdown o test)
export const closeDbConnection = () => {
  if (db && db.open) {
    db.close();
    console.log('[DB_INIT] SQLite database connection closed.');
  }
};

// Esempio di gestione del graceful shutdown (opzionale, ma buona pratica)
process.on('SIGINT', () => {
  closeDbConnection();
  process.exit(0);
});

process.on('SIGTERM', () => {
  closeDbConnection();
  process.exit(0);
});

console.log('[DB_INIT] Database module initialized.');
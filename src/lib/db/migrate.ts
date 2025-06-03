// src/db/migrate.ts
import path from "path";

import { closeDbConnection, db } from "@/lib/db";
// Importa l'istanza db
import { applySchemaToDb } from "./utils";

// Importa la funzione helper

async function runMigration() {
  const schemaPath = path.join(process.cwd(), "database", "schema.sql");
  console.log("Running database migration script...");

  try {
    // L'istanza 'db' da '../lib/db' dovrebbe già essere connessa.
    // Se non lo fosse, new Database() qui creerebbe un'altra istanza.
    // Assicuriamoci che 'db' sia effettivamente l'istanza che vogliamo usare.
    if (!db || !db.open) {
      console.error(
        "Database connection not found or not open. Exiting migration."
      );
      process.exit(1);
    }

    applySchemaToDb(db, schemaPath);
    console.log("Migration script finished successfully.");
  } catch (e) {
    console.error("Migration script failed:", e);
    process.exit(1); // Esci con codice di errore se la migrazione fallisce
  } finally {
    // Decidi se chiudere la connessione qui.
    // Se questo script è l'unico utente della connessione in questo momento, è sicuro.
    // Se l'app principale potrebbe ancora usare la connessione singleton, non chiuderla.
    // Per uno script CLI autonomo, chiudere è generalmente una buona pratica.
    if (db && db.open) {
      console.log("Closing database connection after migration.");
      closeDbConnection();
    }
  }
}

runMigration();

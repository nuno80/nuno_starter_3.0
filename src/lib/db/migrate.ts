// src/db/migrate.ts
import fs from "fs";
import path from "path";

import { db } from "@/lib/db";

// Importa l'istanza db già connessa

function runMigrations() {
  console.log("Starting database migration...");
  const schemaPath = path.join(process.cwd(), "database", "schema.sql");

  if (!fs.existsSync(schemaPath)) {
    console.error(`Migration error: Schema file not found at ${schemaPath}`);
    process.exit(1);
  }

  try {
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    if (schemaSql.trim() === "") {
      console.log("Schema file is empty. No migrations to apply.");
      return;
    }

    console.log("Applying schema from database/schema.sql...");
    db.exec(schemaSql); // Esegue l'intero script SQL
    console.log("Database schema applied successfully.");
  } catch (error) {
    console.error("Error applying database schema:", error);
    process.exit(1);
  } finally {
    // È buona pratica chiudere la connessione se lo script è standalone
    // Tuttavia, se altri script la usano o se è un modulo importato, potresti non volerlo.
    // Per uno script di migrazione che viene eseguito e termina, chiudere è ok.
    if (db && db.open) {
      // db.close(); // Commentato per ora, valuta se necessario
      // console.log('Database connection closed by migration script.');
    }
  }
}

// Esegui la funzione di migrazione
runMigrations();

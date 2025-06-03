// src/db/utils.ts
import type { Database } from "better-sqlite3";
// Assicurati che il tipo sia importato
import fs from "fs";

export function applySchemaToDb(dbInstance: Database, schemaFilePath: string) {
  console.log(
    `[Schema Apply] Attempting to apply schema from ${schemaFilePath}.`
  );
  if (fs.existsSync(schemaFilePath)) {
    try {
      const schemaSql = fs.readFileSync(schemaFilePath, "utf8");
      if (schemaSql.trim() !== "") {
        dbInstance.exec(schemaSql);
        console.log("[Schema Apply] Schema SQL applied successfully.");
      } else {
        console.log(
          `[Schema Apply] Schema file (${schemaFilePath}) is empty. No schema applied.`
        );
      }
    } catch (error) {
      console.error(
        `[Schema Apply] Error applying schema SQL from ${schemaFilePath}:`,
        error
      );
      throw error;
    }
  } else {
    console.warn(
      `[Schema Apply] Schema file not found at ${schemaFilePath}. No schema applied.`
    );
    // Potresti voler lanciare un errore qui se lo schema è obbligatorio per la migrazione
    // throw new Error(`Schema file not found at ${schemaFilePath}`);
  }
}

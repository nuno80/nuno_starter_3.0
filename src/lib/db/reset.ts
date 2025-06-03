// src/db/reset.ts
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db'; // Importa l'istanza db per chiuderla e per eseguire lo schema
import { closeDbConnection } from '@/lib/db'; // Importa la funzione per chiudere

const projectRoot = process.cwd();
const dbDir = path.join(projectRoot, "database");
const dbName = "starter_default.db"; // Assicurati che sia lo stesso nome usato in index.ts
const dbPath = path.join(dbDir, dbName);
const schemaPath = path.join(dbDir, "schema.sql");

async function resetDatabase() {
  console.log(`Attempting to reset database: ${dbPath}`);

  // 1. Chiudi qualsiasi connessione esistente al DB per evitare errori 'database is locked'
  // Questo è importante se il modulo db/index.ts ha già creato un'istanza.
  // La nostra istanza 'db' importata dovrebbe essere quella globale.
  if (db && db.open) {
    console.log('Closing existing database connection...');
    closeDbConnection(); // Usa la funzione esportata da index.ts
  } else {
    console.log('No active database connection found to close, or db object not initialized.');
  }
  
  // Attendi un istante per assicurarti che il file sia rilasciato
  await new Promise(resolve => setTimeout(resolve, 100));


  // 2. Cancella il file del database esistente (e i suoi ausiliari)
  try {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log(`Deleted existing database file: ${dbPath}`);
    }
    const shmPath = `${dbPath}-shm`;
    if (fs.existsSync(shmPath)) {
      fs.unlinkSync(shmPath);
      console.log(`Deleted SHM file: ${shmPath}`);
    }
    const walPath = `${dbPath}-wal`;
    if (fs.existsSync(walPath)) {
      fs.unlinkSync(walPath);
      console.log(`Deleted WAL file: ${walPath}`);
    }
  } catch (error) {
    console.error('Error deleting old database files:', error);
    process.exit(1);
  }

  // 3. Ora, la prossima volta che src/lib/db/index.ts viene importato,
  // dovrebbe ricreare il DB e applicare lo schema.
  // Per essere sicuri che lo schema venga applicato da questo script,
  // possiamo re-importare/rieseguire la logica di inizializzazione o
  // semplicemente eseguire lo schema qui su una nuova connessione.
  // L'approccio più semplice è lasciare che l'app lo faccia al prossimo avvio,
  // o chiamare lo script di migrazione.

  console.log('Database file deleted. Running migration script to recreate schema...');
  
  // Eseguiamo lo script di migrazione per ricreare lo schema
  // Questo richiede che 'tsx' e 'migrate.ts' siano configurati correttamente
  // Potremmo anche duplicare la logica di applySchema qui se preferiamo.
  // Per ora, assumiamo di chiamare lo script di migrazione.
  // Questo è un po' un hack chiamare un altro script così,
  // idealmente la logica di applySchema sarebbe una funzione esportata e riutilizzabile.

  // Alternativa: Duplica la logica di applicazione schema qui
  const newDb = require('../lib/db').db; // Forza il ricaricamento o ottiene la nuova istanza
  if (fs.existsSync(schemaPath)) {
     try {
       const schemaSql = fs.readFileSync(schemaPath, 'utf8');
       if (schemaSql.trim() !== "") {
         newDb.exec(schemaSql);
         console.log('Schema SQL applied successfully to newly created database.');
       } else {
         console.log('schema.sql is empty. Database created empty.');
       }
     } catch (error) {
       console.error('Error applying schema.sql after reset:', error);
       process.exit(1);
     }
   } else {
     console.warn(`schema.sql not found at ${schemaPath}. Database created empty.`);
   }
   if (newDb && newDb.open) {
     // newDb.close(); // Commentato, la connessione singleton dovrebbe rimanere
   }

  console.log('Database reset complete. Schema should be applied.');
}

resetDatabase().catch(e => {
  console.error("Unhandled error during database reset:", e);
  process.exit(1);
});
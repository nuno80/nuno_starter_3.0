// types/globals.d.ts

export {}; // Questa riga è importante!

// Crea un tipo per i ruoli (assicurati che corrisponda ai tuoi ruoli reali)
export type Roles = "admin" | "moderator"; // O solo 'admin' se usi solo quello per ora

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles; // La proprietà 'role' è definita qui come opzionale
    };
  }
}

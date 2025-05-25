// middleware.ts (o src/middleware.ts)
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definisci le rotte che devono essere sempre accessibili, anche senza autenticazione
const isPublicRoute = createRouteMatcher([
  "/",
  "/about", // Assumendo che tu abbia questa pagina
  "/pricing",
  "/devi-autenticarti",
  "/no-access",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)", // Esempio: le webhook di Clerk dovrebbero essere pubbliche
]);

// Definisci le rotte che richiedono il ruolo 'admin'
const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);

// Definisci le rotte che richiedono semplicemente l'autenticazione
const isAuthenticatedRoute = createRouteMatcher(["/features(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // --- CORREZIONE CHIAVE: Aggiungi 'await' qui ---
  const { userId, sessionClaims } = await auth();
  // ---------------------------------------------

  // 1. Se la rotta è pubblica, permetti l'accesso
  if (isPublicRoute(req)) {
    return NextResponse.next(); // Permetti l'accesso alla rotta pubblica
  }

  // 2. Se l'utente non è autenticato, reindirizza a /devi-autenticarti
  if (!userId) {
    // Per le rotte che richiedono autenticazione, reindirizza a una pagina personalizzata
    if (isAuthenticatedRoute(req)) {
      const authRequiredUrl = new URL("/devi-autenticarti", req.url);
      console.log(
        `Redirecting unauthenticated user from ${req.url} to ${authRequiredUrl.toString()}`
      );
      return NextResponse.redirect(authRequiredUrl);
    }
    
    // Per altre rotte non pubbliche, lascia che Clerk gestisca la redirezione
    console.log(
      `Unauthenticated user trying to access ${req.url}. Redirecting via Clerk.`
    );
  }

  // 3. Gestione specifica per la rotta /dashboard (Admin)
  if (isAdminRoute(req)) {
    // Se l'utente non è autenticato O non ha il ruolo 'admin', reindirizza a /no-access
    if (!userId || sessionClaims?.metadata.role !== "admin") {
      const noAccessUrl = new URL("/no-access", req.url);
      console.log(
        `Redirecting non-admin/unauthenticated user from ${req.url} to ${noAccessUrl.toString()}`
      ); // Log per debug
      return NextResponse.redirect(noAccessUrl);
    }
    // Se arriva qui, l'utente è loggato ed è admin. Accesso consentito.
  }

  // 4. Per tutte le altre rotte protette:
  // Se il codice arriva qui, significa che:
  // - La rotta non è pubblica.
  // - L'utente è autenticato (userId esiste, altrimenti sarebbe stato gestito sopra).
  // - La rotta non è /dashboard o l'utente è admin.
  // Quindi, permetti l'accesso.
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Esclude le rotte interne di Next.js e i file statici,
    // a meno che non siano trovati nei parametri di ricerca
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Esegui sempre per le rotte API e trpc
    "/(api|trpc)(.*)",
  ],
};
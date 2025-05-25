import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { sessionClaims } = await auth();

  // Verifica che l'utente corrente sia un admin
  if (sessionClaims?.metadata.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const users = await clerkClient.users.getUserList();

    // Semplifica i dati degli utenti
    const simplifiedUsers = users.map(user => ({
      id: user.id,
      primaryEmail: user.emailAddresses[0]?.emailAddress,
      publicMetadata: user.publicMetadata
    }));

    return NextResponse.json({ users: simplifiedUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
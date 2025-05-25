"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Funzione per caricare gli utenti
  async function loadUsers() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/get-users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  }
  
  // Funzione per aggiornare il ruolo di un utente
  async function updateUserRole(userId, role) {
    try {
      const response = await fetch("/api/admin/set-user-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, role }),
      });
      
      if (response.ok) {
        // Aggiorna la lista utenti
        loadUsers();
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  if (loading) return <div>Caricamento...</div>;
  
  return (
    <div>
      <h1>Gestione Utenti</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Ruolo Attuale</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.primaryEmail}</td>
              <td>{user.publicMetadata?.role || "nessuno"}</td>
              <td>
                <select
                  value={user.publicMetadata?.role || ""}
                  onChange={(e) => updateUserRole(user.id, e.target.value)}
                >
                  <option value="">Nessun ruolo</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
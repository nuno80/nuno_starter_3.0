// src/db/seed.ts (o src/lib/db/seed.ts)
import { closeDbConnection, db } from "@/lib/db";

// Assicurati che il percorso a @/lib/db sia corretto

// --- DATI DI ESEMPIO ---
const usersToSeed = [
  {
    id: "user_2vJ5o9wgDIZM6wtwEx8XW36PrOe",
    email: "nuno.80.al@gmail.com",
    username: "adminuser",
    full_name: "Admin User", // snake_case per coerenza con lo schema SQL
    role: "admin",
    status: "active",
  },
  {
    id: "user_2yAf7DnJ7asI88hIP03WtYnzxDL",
    email: "user1@test.com",
    username: "managerone",
    full_name: "Manager One",
    role: "manager",
    status: "active",
  },
  {
    id: "user_2yAfBFNfcgcJOQqCFJj6WNkBkNu",
    email: "user2@test.com",
    username: "managertwo",
    full_name: "Manager Two",
    role: "manager",
    status: "active",
  },
  {
    id: "user_2yAfEFTxxNtBlL37Ixq9YHLmqAb",
    email: "user3@test.com",
    username: "managerthree",
    full_name: "Manager Three",
    role: "manager",
    status: "active",
  },
  {
    id: "user_2vultw8Mzhm6PZDOuiMHtd2IPJ3",
    email: "armandoluongo@yahoo.it",
    username: "managerfour",
    full_name: "Manager Four",
    role: "manager",
    status: "active",
  },
];

const playersToSeed = [
  // Giocatori esistenti
  {
    id: 572,
    role: "P",
    name: "Meret",
    team: "Napoli",
    current_quotation: 18,
    initial_quotation: 15,
    fvm: 117,
    role_mantra: "Por",
  },
  {
    id: 2170,
    role: "P",
    name: "Milinkovic-Savic V.",
    team: "Torino",
    current_quotation: 17,
    initial_quotation: 10,
    fvm: 63,
    role_mantra: "Por",
  },
  {
    id: 123,
    role: "D",
    name: "Difensore Prova",
    team: "TeamX",
    current_quotation: 10,
    initial_quotation: 8,
    fvm: 50,
    role_mantra: "Dc",
  },
  {
    id: 456,
    role: "C",
    name: "Centrocampista Prova",
    team: "TeamY",
    current_quotation: 15,
    initial_quotation: 12,
    fvm: 70,
    role_mantra: "M;C",
  },
  {
    id: 789,
    role: "A",
    name: "Attaccante Prova",
    team: "TeamZ",
    current_quotation: 25,
    initial_quotation: 20,
    fvm: 90,
    role_mantra: "Pc",
  },
  // Aggiungiamo altri 10 giocatori fittizi
  {
    id: 1001,
    role: "P",
    name: "Portiere Alpha",
    team: "Alpha FC",
    current_quotation: 12,
    initial_quotation: 10,
    fvm: 55,
    role_mantra: "Por",
  },
  {
    id: 1002,
    role: "D",
    name: "Terzino Beta",
    team: "Beta United",
    current_quotation: 8,
    initial_quotation: 7,
    fvm: 40,
    role_mantra: "Ds",
  },
  {
    id: 1003,
    role: "D",
    name: "Centrale Gamma",
    team: "Gamma City",
    current_quotation: 14,
    initial_quotation: 12,
    fvm: 60,
    role_mantra: "Dc",
  },
  {
    id: 1004,
    role: "C",
    name: "Regista Delta",
    team: "Delta Rovers",
    current_quotation: 16,
    initial_quotation: 14,
    fvm: 75,
    role_mantra: "M",
  },
  {
    id: 1005,
    role: "C",
    name: "Mezzala Epsilon",
    team: "Epsilon FC",
    current_quotation: 13,
    initial_quotation: 11,
    fvm: 65,
    role_mantra: "C",
  },
  {
    id: 1006,
    role: "C",
    name: "Trequartista Zeta",
    team: "Zeta Albion",
    current_quotation: 18,
    initial_quotation: 15,
    fvm: 80,
    role_mantra: "T",
  },
  {
    id: 1007,
    role: "A",
    name: "Ala Eta",
    team: "Eta Wanderers",
    current_quotation: 22,
    initial_quotation: 18,
    fvm: 85,
    role_mantra: "A",
  },
  {
    id: 1008,
    role: "A",
    name: "Punta Theta",
    team: "Theta Athletic",
    current_quotation: 30,
    initial_quotation: 25,
    fvm: 100,
    role_mantra: "Pc",
  },
  {
    id: 1009,
    role: "D",
    name: "Jolly Difensivo Iota",
    team: "Iota FC",
    current_quotation: 7,
    initial_quotation: 5,
    fvm: 30,
    role_mantra: "Dd;Ds;Dc",
  },
  {
    id: 1010,
    role: "C",
    name: "Mediano Kappa",
    team: "Kappa Stars",
    current_quotation: 9,
    initial_quotation: 7,
    fvm: 45,
    role_mantra: "M",
  },
];

const leaguesToSeed = [
  {
    id: 1,
    name: "Fantacalcio Serie A - Test League",
    league_type: "classic", // snake_case
    initial_budget_per_manager: 250,
    status: "participants_joining",
    admin_creator_id:
      usersToSeed.find((u) => u.role === "admin")?.id || usersToSeed[0].id, // Prende l'ID dell'admin o il primo utente
    active_auction_roles: "P,D,C,A",
  },
];

// Funzione principale di seeding
async function seedDatabase() {
  console.log("Starting database seeding...");

  // Inserisci Utenti
  const insertUserStmt = db.prepare(`
    INSERT OR IGNORE INTO users (id, email, username, full_name, role, status, created_at, updated_at) 
    VALUES (@id, @email, @username, @full_name, @role, @status, strftime('%s', 'now'), strftime('%s', 'now'))
  `);
  console.log("Seeding users...");
  for (const user of usersToSeed) {
    insertUserStmt.run(user);
  }
  console.log(`${usersToSeed.length} users processed for seeding.`);

  // Inserisci Giocatori
  const insertPlayerStmt = db.prepare(`
    INSERT OR REPLACE INTO players (id, role, role_mantra, name, team, current_quotation, initial_quotation, fvm, fvm_mantra, last_updated_from_source, created_at, updated_at)
    VALUES (@id, @role, @roleMantra, @name, @team, @currentQuotation, @initialQuotation, @fvm, @fvmMantra, strftime('%s', 'now'), strftime('%s', 'now'), strftime('%s', 'now'))
  `);
  console.log("Seeding players...");
  for (const player of playersToSeed) {
    // Assicurati che le proprietà dell'oggetto player corrispondano ai placeholder
    insertPlayerStmt.run({
      ...player, // Copia tutte le proprietà da player
      roleMantra: player.role_mantra, // Assicura che il placeholder @roleMantra corrisponda
      currentQuotation: player.current_quotation,
      initialQuotation: player.initial_quotation,
      fvmMantra: player.fvm_mantra, // Assumendo che fvm_mantra sia una colonna e un placeholder
    });
  }
  console.log(`${playersToSeed.length} players seeded.`);

  // Inserisci Leghe
  const insertLeagueStmt = db.prepare(`
    INSERT OR IGNORE INTO auction_leagues (id, name, league_type, initial_budget_per_manager, status, admin_creator_id, active_auction_roles, created_at, updated_at)
    VALUES (@id, @name, @leagueType, @initialBudgetPerManager, @status, @adminCreatorId, @activeAuctionRoles, strftime('%s', 'now'), strftime('%s', 'now'))
  `);
  console.log("Seeding auction leagues...");
  for (const league of leaguesToSeed) {
    // Assicurati che le proprietà dell'oggetto league corrispondano ai placeholder
    insertLeagueStmt.run({
      id: league.id,
      name: league.name,
      leagueType: league.league_type, // Placeholder @leagueType
      initialBudgetPerManager: league.initial_budget_per_manager, // Placeholder @initialBudgetPerManager
      status: league.status,
      adminCreatorId: league.admin_creator_id, // Placeholder @adminCreatorId
      activeAuctionRoles: league.active_auction_roles, // Placeholder @activeAuctionRoles
    });
  }
  console.log(`${leaguesToSeed.length} leagues seeded.`);

  // Iscrivi i manager alla lega di test
  if (leaguesToSeed.length > 0 && usersToSeed.find((u) => u.role === "admin")) {
    const leagueTestId = leaguesToSeed[0].id;
    const initialBudget = leaguesToSeed[0].initial_budget_per_manager;
    const managersToEnroll = usersToSeed.filter((u) => u.role === "manager");

    const enrollManagerStmt = db.prepare(`
      INSERT OR IGNORE INTO league_participants (league_id, user_id, current_budget, locked_credits, joined_at)
      VALUES (@leagueId, @userId, @currentBudget, 0, strftime('%s', 'now'))
    `);
    console.log(
      `Enrolling ${managersToEnroll.length} managers to league ID ${leagueTestId}...`
    );
    for (const manager of managersToEnroll) {
      enrollManagerStmt.run({
        leagueId: leagueTestId,
        userId: manager.id,
        currentBudget: initialBudget,
      });
    }
    console.log("Managers enrolled.");
  } else {
    console.log(
      "Skipping manager enrollment: No leagues or admin user found in seed data to associate."
    );
  }

  console.log("Database seeding completed.");
}

seedDatabase()
  .catch((err) => {
    console.error("Error during seeding:", err);
    process.exit(1);
  })
  .finally(() => {
    if (db && db.open) {
      closeDbConnection();
      console.log("Database connection closed by seed script.");
    }
  });

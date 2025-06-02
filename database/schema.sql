-- database/schema.sql

-- Tabella Utenti (estende informazioni da Clerk)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- Corrisponde al Clerk userId
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'manager' CHECK(role IN ('admin', 'manager')),
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('pending_approval', 'active', 'suspended')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Giocatori (dal file Excel e dati applicativi)
CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY, -- ID dal file Excel
    role TEXT NOT NULL CHECK(role IN ('P', 'D', 'C', 'A')), -- Portiere, Difensore, Centrocampista, Attaccante
    role_mantra TEXT, 
    name TEXT NOT NULL, 
    team TEXT NOT NULL, 
    current_quotation INTEGER NOT NULL, 
    initial_quotation INTEGER NOT NULL, 
    current_quotation_mantra INTEGER, 
    initial_quotation_mantra INTEGER,
    fvm INTEGER, -- Fantavoto Medio Classico
    fvm_mantra INTEGER, -- Fantavoto Medio Mantra
    photo_url TEXT, 
    last_updated_from_source DATETIME, -- Quando i dati (quotazioni, fvm) sono stati aggiornati l'ultima volta dalla fonte esterna
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_players_name ON players(name);
CREATE INDEX IF NOT EXISTS idx_players_team ON players(team);
CREATE INDEX IF NOT EXISTS idx_players_role ON players(role);

-- Tabella Leghe/Stagioni d'Asta
CREATE TABLE IF NOT EXISTS auction_leagues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    league_type TEXT NOT NULL DEFAULT 'classic' CHECK(league_type IN ('classic', 'mantra')),
    initial_budget_per_manager INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'setup' CHECK(status IN ('setup', 'participants_joining', 'draft_active', 'repair_active', 'market_closed', 'season_active', 'completed', 'archived')),
    active_auction_roles TEXT, -- Es. "P,D,C", "A", "ALL", o NULL/vuoto. Gestito da UI admin.
    draft_window_start DATETIME,
    draft_window_end DATETIME,
    repair_1_window_start DATETIME,
    repair_1_window_end DATETIME,
    -- Aggiungere altre finestre di riparazione se necessario (repair_2_window_start, ecc.)
    admin_creator_id TEXT NOT NULL,
    config_json TEXT, -- Per regole aggiuntive della lega (es. max giocatori per ruolo)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_creator_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_auction_leagues_status ON auction_leagues(status);

-- Tabella Partecipanti Lega (Manager iscritti a una lega/stagione)
CREATE TABLE IF NOT EXISTS league_participants (
    league_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    current_budget INTEGER NOT NULL,
    locked_credits INTEGER NOT NULL DEFAULT 0, -- Crediti impegnati in offerte attive
    roster_slots_json TEXT, -- Es. {"P": 1, "D": 3, "C": 3, "A": 1, "max_P": 3, "max_D": 8, ...}
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (league_id, user_id),
    FOREIGN KEY (league_id) REFERENCES auction_leagues(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabella Aste (per un singolo giocatore all'interno di una auction_league)
CREATE TABLE IF NOT EXISTS auctions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    auction_league_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    start_time DATETIME NOT NULL, -- Ora dell'offerta iniziale che ha avviato l'asta
    scheduled_end_time DATETIME NOT NULL, -- Si resetta con le offerte
    current_highest_bid_amount INTEGER DEFAULT 0,
    current_highest_bidder_id TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'closing', 'sold', 'not_sold', 'cancelled')),
    -- 'pending' potrebbe non servire se l'asta inizia con la prima offerta. 'active' è quando ha almeno un'offerta.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auction_league_id) REFERENCES auction_leagues(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE, -- Se un giocatore è rimosso, le sue aste vengono rimosse
    FOREIGN KEY (current_highest_bidder_id) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE(auction_league_id, player_id, status) -- Per prevenire più aste 'active' per lo stesso giocatore/lega. Da valutare bene.
                                                 -- Forse solo UNIQUE(auction_league_id, player_id) se un giocatore può essere in un'asta attiva una sola volta per lega.
);
CREATE INDEX IF NOT EXISTS idx_auctions_status ON auctions(status);
CREATE INDEX IF NOT EXISTS idx_auctions_league_player ON auctions(auction_league_id, player_id);

-- Tabella Offerte (per un'asta)
CREATE TABLE IF NOT EXISTS bids (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    auction_id INTEGER NOT NULL,
    user_id TEXT NOT NULL, 
    amount INTEGER NOT NULL,
    bid_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    bid_type TEXT DEFAULT 'manual' CHECK(bid_type IN ('manual', 'auto', 'quick')),
    FOREIGN KEY (auction_id) REFERENCES auctions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
);
CREATE INDEX IF NOT EXISTS idx_bids_auction_time ON bids(auction_id, bid_time DESC);
CREATE INDEX IF NOT EXISTS idx_bids_user ON bids(user_id);

-- Tabella Auto-Offerte
CREATE TABLE IF NOT EXISTS auto_bids (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    auction_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    max_amount INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE, -- Diventa FALSE se l'utente abbandona l'asta o l'asta termina
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auction_id) REFERENCES auctions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(auction_id, user_id) -- Un utente ha una sola impostazione di auto_bid attiva per asta
);

-- Tabella Assegnazioni Giocatori (Rosa dei giocatori per manager per lega)
CREATE TABLE IF NOT EXISTS player_assignments (
    auction_league_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    user_id TEXT NOT NULL, 
    purchase_price INTEGER NOT NULL,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (auction_league_id, player_id), -- Un giocatore è assegnato a un solo manager in una lega
    FOREIGN KEY (auction_league_id) REFERENCES auction_leagues(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_player_assignments_user ON player_assignments(auction_league_id, user_id);

-- Tabella Richieste di Svincolo Giocatori
CREATE TABLE IF NOT EXISTS player_discard_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    auction_league_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    player_id INTEGER NOT NULL,
    reason TEXT,
    requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
    admin_resolver_id TEXT,
    resolved_at DATETIME,
    credit_refund_amount INTEGER, -- Importo effettivamente rimborsato
    FOREIGN KEY (auction_league_id) REFERENCES auction_leagues(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_resolver_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabella Transazioni di Budget
CREATE TABLE IF NOT EXISTS budget_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    auction_league_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    transaction_type TEXT NOT NULL CHECK(transaction_type IN (
        'initial_allocation', 
        'win_auction_debit', 
        'discard_player_credit', 
        'admin_budget_increase', 
        'admin_budget_decrease', -- Es. per penalità generiche
        'penalty_response_timeout'
    )),
    amount INTEGER NOT NULL, -- Positivo per crediti (es. discard, increase), negativo per debiti (es. win_auction, penalty)
    related_auction_id INTEGER,
    related_player_id INTEGER,
    related_discard_request_id INTEGER,
    description TEXT,
    balance_after_in_league INTEGER NOT NULL, -- Budget del manager in quella lega DOPO questa transazione
    transaction_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auction_league_id) REFERENCES auction_leagues(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (related_auction_id) REFERENCES auctions(id) ON DELETE SET NULL,
    FOREIGN KEY (related_player_id) REFERENCES players(id) ON DELETE SET NULL,
    FOREIGN KEY (related_discard_request_id) REFERENCES player_discard_requests(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_budget_transactions_user_league ON budget_transactions(user_id, auction_league_id, transaction_time DESC);

-- Tabella per Cooldown Utente Dopo Abbandono Asta
CREATE TABLE IF NOT EXISTS user_auction_cooldowns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    auction_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    abandoned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    cooldown_ends_at DATETIME NOT NULL,
    FOREIGN KEY (auction_id) REFERENCES auctions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(auction_id, user_id) -- Un utente può avere un solo cooldown attivo per un'asta
);

-- Tabella per Timer di Risposta Utente (quando l'offerta viene superata)
CREATE TABLE IF NOT EXISTS user_auction_response_timers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    auction_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    notified_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Quando il timer inizia (es. al login dell'utente e vede che è stato superato)
    response_deadline DATETIME NOT NULL, -- notified_at + 1 ora
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'action_taken', 'deadline_missed')),
    FOREIGN KEY (auction_id) REFERENCES auctions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(auction_id, user_id, status) -- Per avere un solo timer 'pending' per utente/asta. Potrebbe essere solo UNIQUE(auction_id, user_id) se un record viene cancellato/aggiornato.
);

-- Trigger per aggiornare updated_at (Esempio per la tabella users, da replicare per le altre se necessario)
-- SQLite non ha un ON UPDATE CURRENT_TIMESTAMP nativo per le colonne come MySQL.
-- I trigger sono il modo per farlo.
CREATE TRIGGER IF NOT EXISTS update_users_updated_at
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS update_players_updated_at
AFTER UPDATE ON players
FOR EACH ROW
BEGIN
    UPDATE players SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS update_auction_leagues_updated_at
AFTER UPDATE ON auction_leagues
FOR EACH ROW
BEGIN
    UPDATE auction_leagues SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS update_auctions_updated_at
AFTER UPDATE ON auctions
FOR EACH ROW
BEGIN
    UPDATE auctions SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS update_auto_bids_updated_at
AFTER UPDATE ON auto_bids
FOR EACH ROW
BEGIN
    UPDATE auto_bids SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

-- Aggiungere trigger simili per player_assignments, player_discard_requests se hanno campi updated_at
-- e se l'aggiornamento automatico è desiderato.
CREATE TABLE rooms (id TEXT PRIMARY KEY, name TEXT NOT NULL, config TEXT NOT NULL, current_week TEXT NOT NULL, created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE instances (room_id TEXT NOT NULL, week_key TEXT NOT NULL, plan TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1, mutation_id TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, archived_at TEXT, PRIMARY KEY(room_id, week_key));
--> statement-breakpoint
CREATE TABLE capabilities (id TEXT PRIMARY KEY, room_id TEXT NOT NULL, code_hash TEXT NOT NULL UNIQUE, code TEXT NOT NULL, role TEXT NOT NULL, alliance TEXT, label TEXT NOT NULL, revoked INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE INDEX cap_room ON capabilities(room_id);
--> statement-breakpoint
CREATE TABLE registrations (room_id TEXT NOT NULL, week_key TEXT NOT NULL, member_id TEXT NOT NULL, alliance TEXT NOT NULL, body TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL, mutation_id TEXT NOT NULL DEFAULT '', PRIMARY KEY(room_id, week_key, member_id));
--> statement-breakpoint
CREATE TABLE edits (id TEXT PRIMARY KEY, room_id TEXT NOT NULL, week_key TEXT NOT NULL, kind TEXT NOT NULL, entity_id TEXT, actor TEXT NOT NULL, changes TEXT NOT NULL, created_at TEXT NOT NULL, mutation_id TEXT NOT NULL);
--> statement-breakpoint
CREATE INDEX edit_room ON edits(room_id, week_key, created_at);
--> statement-breakpoint
CREATE INDEX edit_member ON edits(room_id, week_key, entity_id, created_at);
--> statement-breakpoint
CREATE TABLE rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0);

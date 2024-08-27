BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "coins" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"c_balance"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"username"	text,
	"first_name"	text,
	"last_name"	text,
	"email"	text,
	"password"	text,
	"birth_date"	datetime,
	"coin_id"	integer,
	CONSTRAINT "fk_coins_users" FOREIGN KEY("coin_id") REFERENCES "coins"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "orders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"user_id"	integer,
	CONSTRAINT "fk_users_orders" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "packages" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"amount"	integer,
	"price"	integer,
	"pic"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "transactions" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"transaction_type"	text,
	"package_id"	integer,
	"user_id"	integer,
	"order_id"	integer,
	CONSTRAINT "fk_packages_transactions" FOREIGN KEY("package_id") REFERENCES "packages"("id"),
	CONSTRAINT "fk_orders_transactions" FOREIGN KEY("order_id") REFERENCES "orders"("id"),
	CONSTRAINT "fk_users_transactions" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX IF NOT EXISTS "idx_coins_deleted_at" ON "coins" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_users_deleted_at" ON "users" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_orders_deleted_at" ON "orders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_packages_deleted_at" ON "packages" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_transactions_deleted_at" ON "transactions" (
	"deleted_at"
);
COMMIT;

BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "coins" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"balance"	real,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "bookshelves" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"username"	text,
	"password"	text,
	"email"	text,
	"first_name"	text,
	"last_name"	text,
	"birth_date"	datetime,
	"gender"	text,
	"profile"	text,
	"coin_id"	integer,
	"bookshelf_id"	integer,
	"writer"	numeric,
	"income"	real,
	CONSTRAINT "uni_users_username" UNIQUE("username"),
	CONSTRAINT "uni_users_email" UNIQUE("email"),
	CONSTRAINT "fk_users_coin" FOREIGN KEY("coin_id") REFERENCES "coins"("id"),
	CONSTRAINT "fk_users_bookshelf" FOREIGN KEY("bookshelf_id") REFERENCES "bookshelves"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "novels" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"content"	longtext,
	"description"	text,
	"type1"	text,
	"type2"	text,
	"rate"	text,
	"writer_name"	text,
	"cover"	text,
	"price"	real,
	"like_count"	integer,
	"buy_amount"	integer,
	"writer_id"	integer,
	CONSTRAINT "fk_novels_writer" FOREIGN KEY("writer_id") REFERENCES "users"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "comment" (
	"novel_id"	integer,
	"user_id"	integer,
	CONSTRAINT "fk_comment_user" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_comment_novel" FOREIGN KEY("novel_id") REFERENCES "novels"("id"),
	PRIMARY KEY("novel_id","user_id")
);
CREATE TABLE IF NOT EXISTS "orders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"user_id"	integer,
	"novel_id"	integer,
	CONSTRAINT "fk_orders_novel" FOREIGN KEY("novel_id") REFERENCES "novels"("id"),
	CONSTRAINT "fk_users_orders" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "packages" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"amount"	real,
	"price"	real,
	"pic"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "transactions" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"transaction_type"	text,
	"payment"	text,
	"package_id"	integer,
	"order_id"	integer,
	"user_id"	integer,
	"amount__t"	real,
	CONSTRAINT "fk_users_transactions" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	CONSTRAINT "fk_packages_transactions" FOREIGN KEY("package_id") REFERENCES "packages"("id"),
	CONSTRAINT "fk_transactions_order" FOREIGN KEY("order_id") REFERENCES "orders"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "bookshelf_lists" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"bookshelf_id"	integer,
	"novel_id"	integer,
	CONSTRAINT "fk_bookshelf_lists_novel" FOREIGN KEY("novel_id") REFERENCES "novels"("id"),
	CONSTRAINT "fk_bookshelf_lists_bookshelf" FOREIGN KEY("bookshelf_id") REFERENCES "bookshelves"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "likes" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"user_id"	integer,
	"novel_id"	integer,
	CONSTRAINT "fk_novels_liked_users" FOREIGN KEY("novel_id") REFERENCES "novels"("id"),
	CONSTRAINT "fk_likes_user" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "comments" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"description"	text,
	"user_id"	integer,
	"novel_id"	integer,
	CONSTRAINT "fk_comments_novel" FOREIGN KEY("novel_id") REFERENCES "novels"("id"),
	CONSTRAINT "fk_comments_user" FOREIGN KEY("user_id") REFERENCES "users"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX IF NOT EXISTS "idx_coins_deleted_at" ON "coins" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_bookshelves_deleted_at" ON "bookshelves" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_users_deleted_at" ON "users" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_novels_deleted_at" ON "novels" (
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
CREATE INDEX IF NOT EXISTS "idx_bookshelf_lists_deleted_at" ON "bookshelf_lists" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_likes_deleted_at" ON "likes" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_comments_deleted_at" ON "comments" (
	"deleted_at"
);
COMMIT;

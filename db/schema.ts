import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id", { autoIncrement: true }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  profileImage: text("profile_image"), // store base64-encoded image
  emailVerified: boolean("email_verified").default(false).notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  isUser: boolean("is_user").default(true).notNull(),
  isCustomer: boolean("is_customer").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "timestamp" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "timestamp" })
    .defaultNow()
    .notNull(),
});

export const userSessions = pgTable("user_sessions", {
  id: integer("id", { autoIncrement: true }).primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  refreshToken: text("refresh_token").notNull(),
  accessToken: text("access_token").notNull(),
  userAgent: varchar("user_agent", { length: 512 }),
  createdAt: timestamp("created_at", { mode: "timestamp" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "timestamp" })
    .defaultNow()
    .notNull(),
});

export const emailOtps = pgTable("email_otps", {
  id: integer("id", { autoIncrement: true }).primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  otpCode: varchar("otp_code", { length: 10 }).notNull(),
  expiresAt: timestamp("expires_at", { mode: "timestamp" }).notNull(),
  used: boolean("used").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "timestamp" })
    .defaultNow()
    .notNull(),
});

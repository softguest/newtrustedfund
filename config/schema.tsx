import { pgTable, pgEnum,uuid, varchar, timestamp, integer, numeric, text, decimal } from "drizzle-orm/pg-core";
// import { users } from "./users";
import { relations } from "drizzle-orm";

const kycStatusEnum = pgEnum("kyc_status", ["pending", "approved", "rejected"]);
export const UserRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),                // Clerk userId
  clerkId: varchar("clerk_id").notNull().unique(),
  email: varchar("email").notNull(),
  fullName: varchar("full_name").notNull(),
  phone: varchar("phone").notNull(),

  kycStatus: varchar("kyc_status", { length: 20 }).default("pending").notNull(), // pending/approved/rejected
  kycFront: text("kyc_front"),  // Cloudinary URL
  kycBack: text("kyc_back"),

  status: varchar("status", { length: 20 }).default("pending").notNull(),

  // ✅ Role column using enum
  role: varchar("role", { length: 30 }).default("user"), // puser/admin

  createdAt: timestamp("created_at").defaultNow(),
});

export const kyc = pgTable("kyc", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), 
  idDocumentUrl: text("id_document_url"),
  addressProofUrl: text("address_proof_url"),
  submittedAt: timestamp("submitted_at").defaultNow(),

  // New fields for review/approval
  reviewedAt: timestamp("reviewed_at"),       // when admin reviewed
  reviewedBy: text("reviewed_by"),            // admin user id
  status: varchar("status", { length: 20 }).default("pending"), // pending/approved/rejected
  rejectionReason: text("rejection_reason"),  // optional reason for rejection
});

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  balance: numeric("balance", { precision: 12, scale: 2 }).default("0"),
  accountNumber: varchar("account_number", { length: 20 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const targetGoals = pgTable("target_goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), 
  accountId: uuid("account_id").references(() => accounts.id).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  targetAmount: numeric("target_amount", { precision: 12, scale: 2 }).notNull(),
  deadline: timestamp("deadline"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const groups = pgTable("groups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: text("user_id").notNull(), // admin
  goalAmount: numeric("goal_amount", { precision: 12, scale: 2 }).notNull(),
  contributionAmount: numeric("contribution_amount", {
    precision: 12,
    scale: 2,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


// GROUP MEMBERS
export const groupMembers = pgTable("group_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  groupId: uuid("group_id").notNull(),
  userId: text("user_id").notNull(), 
  expectedAmount: decimal("expected_amount", { precision: 10, scale: 2 }),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// CONTRIBUTIONS
export const contributions = pgTable("contributions", {
  id: uuid("id").defaultRandom().primaryKey(),
  groupId: uuid("group_id").notNull(),
  userId: text("user_id").notNull(), 
  accountId: uuid("account_id").notNull(), // ✅ NEW
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// --------------------------
// USER WALLET
// --------------------------
export const wallets = pgTable("wallets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => users.id), 
  balance: integer("balance").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// --------------------------
// TRANSACTIONS
// --------------------------
export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  account_id: uuid("account_id"),
  amount: integer("amount").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // deposit/withdrawal/transfer
  status: varchar("status", { length: 50 }).notNull().default("initiated"),
  phone_number: varchar("phone_number", { length: 32 }),
  fromAccountId: uuid("from_account_id"),
  toAccountId: uuid("to_account_id"),
  narration: text("narration"),
  momo_response: text("momo_response"),
  momoReference: varchar("momo_reference"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// --------------------------
// MOMO REQUEST LOG
// --------------------------
export const momoLogs = pgTable("momo_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(), 
  externalId: varchar("external_id").notNull(),
  phone: varchar("phone").notNull(),
  amount: integer("amount").notNull(),
  status: varchar("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const withdrawals = pgTable("withdrawals", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  accountId: uuid("account_id").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  amount: integer("amount").notNull(),
  status: varchar("status", { length: 20 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

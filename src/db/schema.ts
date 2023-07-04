import { type InferModel, relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const LiveShowStatus = pgEnum("LiveShowStatus", [
  "SETUP",
  "AWAITING",
  "STREAMING",
  "FINISHED",
]);
export const tags = pgTable(
  "tags",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      titleIdx: uniqueIndex("title_idx").on(table.title),
    };
  }
);
export const mixes = pgTable("mixes", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 50 }).notNull(),
  title: varchar("full_name", { length: 50 }).notNull(),
  description: varchar("description", { length: 2048 }),
  audioUrl: text("full_name"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),

  isProcessed: boolean("is_processed").notNull().default(false),
});

export const liveShows = pgTable("live_shows", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 50 }).notNull(),
  title: text("full_name"),
  description: varchar("description", { length: 256 }),
  status: LiveShowStatus("status"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
});

export const mixesToTags = pgTable(
  "mix_tags",
  {
    mixId: uuid("mix_id")
      .notNull()
      .references(() => mixes.id),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey(t.mixId, t.tagId),
  })
);
export const liveShowsToTags = pgTable(
  "live_show_tags",
  {
    liveShowId: uuid("live_show_id")
      .notNull()
      .references(() => mixes.id),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey(t.liveShowId, t.tagId),
  })
);

export const users = pgTable(
  "users",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified"),
    name: text("name"),
    bio: varchar("name", { length: 2048 }),
    profileImage: text("profileImage"),
    headerImage: text("headerImage"),
    password: varchar("password", { length: 1024 }),
    streamKey: varchar("stream_key", { length: 64 }),
    urls: text("urls").array(),
  },
  (table) => {
    return {
      titleIdx: uniqueIndex("username_idx").on(table.username),
    };
  }
);

export const mixRelations = relations(mixes, ({ one, many }) => ({
  user: one(users, {
    fields: [mixes.userId],
    references: [users.id],
  }),
  mixesToTags: many(mixesToTags),
}));
export const userRelations = relations(users, ({ many }) => ({
  mixes: many(mixes),
}));
export const liveShowRelations = relations(liveShows, ({ many }) => ({
  liveShowsToTags: many(liveShowsToTags),
}));

export type User = InferModel<typeof users, "select">;
export type Mix = InferModel<typeof mixes, "select">;
export type LiveShow = InferModel<typeof liveShows, "select">;

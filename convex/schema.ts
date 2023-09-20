import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  games: defineTable({
    hostId: v.string(),
    playerIds: v.array(v.id("users")),
    slug: v.string(),
    puzzle: v.optional(v.array(v.any())),
    selectedPuzzle: v.optional(v.number()),
    winnerName: v.optional(v.string()),
    winnerId: v.optional(v.string()),
    gameState: v.optional(v.string()),
  }).index("s", ["slug"]),
  users: defineTable({
    userId: v.string(),
    name: v.string(),


  }),
  presence: defineTable({
    user: v.string(),
    room: v.string(),
    updated: v.number(),
    data: v.any(),
  })
    // Index for fetching presence data
    .index("by_room_updated", ["room", "updated"])
    // Index for updating presence data
    .index("by_user_room", ["user", "room"]),
  counter_table: defineTable({ name: v.string(), counter: v.number() }),
  sessions: defineTable(v.any()), // Make as specific as you want
});
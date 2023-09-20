import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { mutationWithSession, queryWithSession } from "./lib/withSession";

/**
 * Creates a session and returns the id. For use with the SessionProvider on the
 * client.
 * Note: if you end up importing code from other modules that use sessions,
 * you'll likely want to move this code to avoid import cycles.
 */
export const create = mutation(async (ctx) => {
  return ctx.db.insert("sessions", {
    // TODO: insert your default values here
 
  });
});

export const loggedOut = mutationWithSession({
  handler: async (ctx) => {
    // Wipe the slate clean
    await ctx.db.replace(ctx.session._id, {
      
    });
  },
});
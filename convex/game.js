import { action, mutation } from "./_generated/server";
import { v } from "convex/values";
import { mutationWithSession, queryWithSession } from "./lib/withSession";
import {randomSlug} from './lib/randomSlug'
import {puzzles} from '../constants/puzzles'

export const create = mutationWithSession({
  handler: async (ctx) => {

    const user = await ctx.db.insert("users",{
      userId: ctx.session._id,
      name: 'Anonymous',
    });
    
    const gameId = await ctx.db.insert("games", {
      hostId: ctx.session._id,
      playerIds: [user],
      slug: randomSlug(),
      gameState: "lobby",
    });
    
    

    return gameId;
  },
});

export const join = mutationWithSession({
  args: { gameCode: v.string() },
  handler: async (ctx, { gameCode }) => {
    
    const game = await ctx.db
      .query("games")
      .withIndex("s", (q) => q.eq("slug", gameCode))
      .order("desc")
      .first();

      
     
     if (!game) throw new Error("Game not found");
     if(game.playerIds.find((element)=> element !== ctx.session._id)){
      
     
      
      const user = await ctx.db.insert("users",{
        userId: ctx.session._id,
        name: 'Anonymous',
      });

      game.playerIds.push(user)

      await ctx.db.patch(game._id, { playerIds: game.playerIds });

     }else{
      console.log('Already joined')
     }
     
 
     
      
 
    return game._id
  },
});


export const get = queryWithSession({
  args: {gameId: v.id("games")},
  handler: async (ctx, {gameId}) => {
    
   
    const game = await ctx.db.get(gameId);

    let players = []

    for(var i = 0; i < game.playerIds.length; i++){
      players.push(await ctx.db.get(game.playerIds[i]))
    }
    
    game['playerDetails'] = players
   
    
   
  return game
  
  },

});

export const getSession = queryWithSession({
 
  handler: async (ctx) => {
  

  return ctx.session._id


  
   },

});

export const changeName = mutationWithSession({
  args: {name: v.string(), userid: v.id("users")},
  handler: async (ctx,{name,userid}) => {
  
    const user = await ctx.db.get(userid);
   
    if (name.length > 30) throw new Error("Name too long");
    await ctx.db.patch(user._id, { name })

  


  
   },

});

export const start = mutationWithSession({
  args: {
    gameId: v.id("games"),
    tiles: v.array(v.any())
  },
  handler: async (ctx,{gameId,tiles}) => {

   
 
   
   
    const puzzle = await ctx.db.patch(gameId,{
      puzzle: tiles,
      selectedPuzzle: Math.floor(Math.random()*puzzles.length),
      gameState: "start",
    })
    

    

  

  
   },

});

export const winner = mutationWithSession({
  args: {
   gameId: v.id("games"),

  },
  handler: async (ctx,{gameId}) => {

    const name = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), ctx.session._id))
      .first();
 
    
    await ctx.db.patch(gameId,{
      winnerId: name.userId,
      winnerName: name.name,
      gameState: 'end',
    })

  

  
   },

});





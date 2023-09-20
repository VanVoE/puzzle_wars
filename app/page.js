"use client"
import Navbar from '@/components/Navbar'
import Link from '@/node_modules/next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";
import { useSessionMutation, useSessionQuery } from "./hooks/useServerSession";
import { useRouter } from 'next/router'
import Lobby from './Lobby'
import Main from './Main'


export default function Home() {
 
  const hostGame = useSessionMutation(api.game.create)
  const joinGame = useSessionMutation(api.game.join)

 
  const [gameId, setGameId] = useState('')
  const [gameCode, setGameCode] = useState('')
  
  
  useEffect(() => {
   
    if (typeof window === "undefined") return;
    if (gameId){
      
      window.location.hash = gameId;
    

    } 
    else window.location.hash = "";
  }, [gameId]);



  


  
   
  
  
  return (
    <div className=''>
      {/* <Navbar/> */}
      <main className="max-w-7xl mx-auto">
        
       
        {!gameId ? 
        <Main hostGame={hostGame} joinGame={joinGame} gameId={gameId} setGameId={setGameId} gameCode={gameCode} setGameCode={setGameCode}/>
        :
        <Lobby gameId={gameId} gameCode={gameCode}/>
        
      }
        


        
        
      </main>
    </div>
    
  )
}

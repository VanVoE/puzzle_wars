"use client"
import React, {useEffect,useState,useRef} from 'react'
import { useSessionMutation, useSessionQuery } from "./hooks/useServerSession";
import { api } from "../convex/_generated/api";
import { useAction } from "convex/react";
import { convexToJson } from 'convex/values';
import useSingleFlight from "./hooks/useSingleFlight";
import {puzzles} from '../constants/puzzles'

const Lobby = ({gameId, gameCode}) => {

  const gameDetails = useSessionQuery(api.game.get,{gameId})
  const sessionId = useSessionQuery(api.game.getSession)
  const changeName = useSingleFlight(useSessionMutation(api.game.changeName))
  const [tiles, setTiles] = useState([])
  const [isTileSelected,setIsTileSelected] = useState(false)
  const [selectedId, setSelectedId] = useState()
  const [prompt, setPrompt] = useState('')
  const startGame = useSessionMutation(api.game.start)
  const winner = useSessionMutation(api.game.winner)
  const [puzzleIndex, setPuzzleIndex] = useState(2)
  const [isComplete, setIsComplete] = useState(false)
  const [startButtonText,setStartButtonText] = useState('Start')
  
 

    useEffect(() => {
      if (gameDetails === undefined) return
      setTiles(gameDetails.puzzle)
     
     
    }, [gameDetails])
    
 
  const generateTiles = () => {
    let newTilesArray = []
    for(let i=0; i<25;i++){
      let newTile = {
        id:i,
        top:-(Math.floor(i/5))*140,
        left: i<5 ? -i*170 : -(i%5)*170,
      }
      newTilesArray.push(newTile)
    }

    //randomize array
    let length= newTilesArray.length
    for(let i=0; i<length; i++){
      let random=Math.floor(Math.random()*(length-1))
      let randomItemArray=newTilesArray.splice(random,1)
      newTilesArray.push(randomItemArray[0])
    }
    return newTilesArray
   
  }

  const handleSwap = (id) => {

  
   
    if(isTileSelected){
      swapTiles(id)
      
    }else{
      setIsTileSelected(true)
      setSelectedId(id)
    }

    

  }

  const swapTiles = (id) => {
    let newTiles = [...tiles]
    let index1 = tiles.findIndex(tile=>tile.id===selectedId)
    let index2 = tiles.findIndex(tile=>tile.id===id)
  

    let tile1 = {...newTiles[index1]}
    let tile2 = {...newTiles[index2]}
    newTiles[index2] = tile1
    newTiles[index1] = tile2
    setTiles(newTiles)
    setIsTileSelected(false)
    setSelectedId(null)
  
  }

  const start = async (e) => {
    let generatedTiles = generateTiles()
   
    await startGame({gameId: gameId, tiles: generatedTiles})

    setTiles(gameDetails.puzzle)
    setStartButtonText('Play Again')
  
  }

  const checkProgress = async () => {
 
    for(let i = 0; i<tiles.length; i++){
    
      if(tiles[i].id !== i){
      
        return
      }
    }
    


 
 
    await winner({gameId:gameId})

  }

 
 

  
   

  return (
    <div className='max-w-7xl mx-auto'>

    

    <div className='grid grid-cols-1 md:grid-cols-6'>
      
      <div className='col-span-1 md:col-span-2 flex items-center justify-center'>
        <div className='flex flex-col bg-black/10 shadow-md p-4 rounded-lg mt-20'>
      
        <h1 className='mt-10 text-4xl font-bold text-center'>Puzzle Wars</h1>
        <h1 className='text-xl mt-5 text-center'>Room Code: {gameDetails?.slug}</h1>
        
        <div className='flex justify-center mt-4'>
        {gameDetails?.selectedPuzzle !== undefined ? <img src={puzzles[gameDetails?.selectedPuzzle]} className='w-[200px] h-[200px] object-cover'/>
        : <div className='w-[200px] h-[200px] border border-white flex items-center justify-center text-center'>Waiting on host<br/>to start...</div>
        }
        </div>
        
       
     {gameDetails?.hostId === sessionId && (
        
        
        <button className='bg-black/30 hover:bg-black/10 mt-4 rounded-md py-2' onClick={start} 
        disabled={gameDetails?.gameState === "start" ? true : false}>
          {gameDetails?.gameState === "start" ? "In Progress" : startButtonText}
        </button>
        

    
     )}
    {gameDetails?.gameState === "start" && <button onClick={checkProgress} className='bg-black/30 hover:bg-black/10 mt-4 rounded-md py-2'>Check Board</button>}
  
      <div className='flex flex-col space-y-2 mt-5'>
        <h1>Players:</h1>
        {gameDetails?.playerDetails.map((player,index)=>(
      
          sessionId === player.userId ?
            <div key={index} className='flex space-x-2'>
            <span>You -</span>
            <input type="text" maxLength={30} defaultValue={player.name} onChange={async (e)=>changeName({ name: e.target.value, userid: player._id })} placeholder='Enter Name' className='bg-transparent  outline-none'/>
            
            </div>
            :
            <h1 key={index}> {player.name !== "Anonymous" ? player.name : 'Anonymous'}</h1>
          
        )

        )}
      
      </div>


    
      </div> 
      </div>
      
   {/* Puzzle */}
    <div  className='grid grid-cols-5 col-span-4 mt-10 h-[700px]'>
     
      {gameDetails?.gameState === "start" &&
       tiles?.map((item,index)=>(
          <div key={index} onClick={()=>handleSwap(item.id)} className= 'w-[170px] h-[140px] relative  overflow-hidden '>
            { selectedId === item.id && <div className='bg-red-500 opacity-40 absolute z-10 w-full h-full'></div>}
            <img className='min-w-[853px] h-[700px] absolute object-cover m-0 p-0' style={{top:item.top,left:item.left}} src={puzzles[gameDetails?.selectedPuzzle]}/>
          </div>
        ))

      }
      {gameDetails?.gameState=== "end" &&
        <div className='col-span-5 h-full flex items-center justify-center text-center text-7xl bg-black/10'>{gameDetails?.winnerId === sessionId ? "You Won!!!": gameDetails?.winnerName + " Wins!"}</div>
      }



    
    
    </div>

    
      
    
 
    
    
    

   
     
 
    </div>
    

  </div>
  )
}

export default Lobby
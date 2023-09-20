"use client"
import React, { useEffect } from 'react'
import { useSessionMutation, useSessionQuery } from "../../hooks/useServerSession";

const page = () => {
  //const game = useSessionQuery()

useEffect(() => {
 console.log(window.location.pathname)
}, [])

  

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='grid grid-cols-6 '>
        
        <div className='col-span-2 flex justify-center'>
          <div className='flex flex-col'>
          <h1 className='mt-10 text-4xl font-bold'>Puzzle Wars</h1>
          <h1 className='text-xl mt-5'>Room Code: 123A</h1>
        <div className='flex flex-col space-y-2 mt-5'>
          <input placeholder='Player 1' className='bg-transparent border-0 outline-none'/>
          <input placeholder='Player 2' className='bg-transparent border-0 outline-none'/>
          <input placeholder='Player 3' className='bg-transparent border-0 outline-none'/>
          <input placeholder='Player 4' className='bg-transparent border-0 outline-none'/>
        </div>

          </div>
        
        
        </div>
        
     
      
      <img className='w-full col-span-4' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/af345c6a-c046-443b-b446-4349ca747e05/dg924xt-59adc489-60dd-4bf9-ab4e-66832522cbf1.png/v1/fill/w_894,h_894,q_70,strp/freebie_friday__7__by_darkmage73_dg924xt-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcL2FmMzQ1YzZhLWMwNDYtNDQzYi1iNDQ2LTQzNDljYTc0N2UwNVwvZGc5MjR4dC01OWFkYzQ4OS02MGRkLTRiZjktYWI0ZS02NjgzMjUyMmNiZjEucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.JXm42sblRT9epwpydhzhI49tvI9GFkaPs9cu5bAx5nQ'/>
   
      </div>
      

    </div>
  )
}

export default page
import React from 'react'

const Main = ({hostGame,joinGame, gameId, setGameId, gameCode,setGameCode}) => {
  return (
 
<div className='flex pt-20  items-center justify-center'>

<div className='flex flex-col space-y-10 p-10 bg-black/10 rounded-lg'>

  <h1 className='text-7xl font-bold'>Puzzle Wars</h1>
  <p>Coolest Puzzle game multiplayer on the internet and the winner of the hackathon!</p>
  
  <form className="flex w-full"
   onSubmit={async (e) => {
    e.preventDefault();
    setGameId(await joinGame({ gameCode }));
  }}
  
  >
      <input
        type="text"
 
        value={gameCode}
        placeholder="Game code"
        onChange={(e) => setGameCode(e.target.value.substring(0,4).toUpperCase())}
     
        className="h-12 w-0 grow rounded-tl-lg rounded-bl-lg   bg-black/10 p-2 text-white outline-none"
      />
      <button
        type="submit"
        
        className="h-12   bg-black/30 py-2 px-4 text-white hover:bg-black/10 placeholder-white rounded-tr-lg rounded-br-lg"
      >
        Join
      </button>
  </form>
  <button
      onClick={async () => {
        setGameId(await hostGame());
      }}
      className="py-2 bg-black/30 hover:bg-black/10 text-white rounded-lg"
    >
      Host a game
    </button>

</div>



<div>

</div>

</div>

  )
}

export default Main
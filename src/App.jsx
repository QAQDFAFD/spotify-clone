import React from 'react'
import Siderbar from './components/Siderbar'
import Player from './components/Player'
import Display from './components/Display'
import { useContext } from 'react'
import { PlayerContext } from './context/PlayerContext'
function App() {
	const { audioRef, track } = useContext(PlayerContext)
	return (
		<div className='h-screen bg-black'>
			<div className='flex h-[90%]'>
				<Siderbar></Siderbar>
				<Display></Display>
			</div>
			<Player></Player>
			<audio ref={audioRef} preload='auto' src={track.file}></audio>
		</div>
	)
}

export default App

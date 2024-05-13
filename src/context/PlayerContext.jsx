import { useState } from 'react'
import { useRef } from 'react'
import { createContext } from 'react'
import { songsData } from '../assets/assets'
import { useEffect } from 'react'

export const PlayerContext = createContext()
const PlayerContextProvider = props => {
	const audioRef = useRef()
	const seekBg = useRef()
	const seekBar = useRef()
	const [track, setTrack] = useState(songsData[0])
	const [palyStatus, setPlayStatus] = useState(false)
	const [time, setTime] = useState({
		currentTime: { second: 0, mimute: 0 },
		totalTime: { second: 0, mimute: 0 }
	})
	const play = () => {
		audioRef.current.play()
		setPlayStatus(true)
	}
	const pause = () => {
		audioRef.current.pause()
		setPlayStatus(false)
	}
	const playWidthId = async id => {
		await setTrack(songsData[id])
		await audioRef.current.play()
		await setPlayStatus(true)
	}
	const seekSong = async e => {
		console.log(e)
		const seekTime =
			(e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
			audioRef.current.duration
		audioRef.current.currentTime = seekTime
	}
	useEffect(() => {
		setTimeout(() => {
			audioRef.current.ontimeupdate = () => {
				seekBar.current.style.width =
					Math.floor(
						(audioRef.current.currentTime /
							audioRef.current.duration) *
							100
					) + '%'
				setTime({
					currentTime: {
						second: Math.floor(audioRef.current.currentTime % 60),
						mimute: Math.floor(audioRef.current.currentTime / 60)
					},
					totalTime: {
						second: Math.floor(audioRef.current.duration % 60),
						mimute: Math.floor(audioRef.current.duration / 60)
					}
				})
			}
		}, 1000)
	}, [audioRef])
	const contextValue = {
		seekSong,
		playWidthId,
		audioRef,
		seekBg,
		seekBar,
		track,
		setTrack,
		palyStatus,
		setPlayStatus,
		time,
		setTime,
		play,
		pause
	}
	return (
		<PlayerContext.Provider value={contextValue}>
			{props.children}
		</PlayerContext.Provider>
	)
}
export default PlayerContextProvider

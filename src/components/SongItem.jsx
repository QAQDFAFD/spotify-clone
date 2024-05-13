import React from 'react'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
function SongItem({ name, image, desc, id }) {
	const { playWidthId } = useContext(PlayerContext)
	return (
		<div
			onClick={() => playWidthId(id)}
			className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff29]'>
			<img className='w-full rounded' src={image} alt='' />
			<p className='font-bold mt-2 mb-1'>{name}</p>
			<p className='text-slate-200'>{desc}</p>
		</div>
	)
}
SongItem.propTypes = {
	name: PropTypes.string,
	image: PropTypes.string,
	desc: PropTypes.string,
	id: PropTypes.number
}

export default SongItem

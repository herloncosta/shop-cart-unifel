import { useState, useRef } from "react"

export const ZoomImage = ({
	src,
	alt = "",
	className = "",
	containerClassName = "",
	showLens = false,
}) => {
	const [isZoomed, setIsZoomed] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const imageRef = useRef(null)

	const handleMouseEnter = () => {
		setIsZoomed(true)
	}

	const handleMouseLeave = () => {
		setIsZoomed(false)
		setPosition({ x: 0, y: 0 })
	}

	const handleMouseMove = (e) => {
		if (!imageRef.current) return

		const { left, top, width, height } =
			imageRef.current.getBoundingClientRect()
		const x = ((e.clientX - left) / width) * 100
		const y = ((e.clientY - top) / height) * 100

		setPosition({ x, y })
	}

	return (
		<div
			className={`
        relative inline-block overflow-hidden 
        cursor-zoom-in hover:cursor-zoom-out
        ${containerClassName}
      `}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
		>
			<div className='overflow-hidden relative'>
				<img
					ref={imageRef}
					src={src}
					alt={alt}
					className={`
            w-full h-auto block transition-transform duration-300 ease-in-out
            ${className}
            ${isZoomed ? "scale-150" : "scale-100"}
          `}
					style={{
						transformOrigin: `${position.x}% ${position.y}%`,
					}}
				/>
			</div>

			{showLens && isZoomed && (
				<div
					className='
            absolute w-24 h-24 border-2 border-white border-opacity-60 
            rounded-full bg-white bg-opacity-20 pointer-events-none
            transform -translate-x-1/2 -translate-y-1/2
          '
					style={{
						left: `${position.x}%`,
						top: `${position.y}%`,
						display: showLens ? "block" : "none",
					}}
				/>
			)}
		</div>
	)
}

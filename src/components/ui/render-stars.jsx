import { Star } from "lucide-react"

export const RenderStars = ({ rating, size, text }) => {
	const stars = []
	for (let i = 1; i <= 5; i++) {
		if (i <= rating?.rate) {
			stars.push(<Star key={i} size={size} color='#ffc107' fill='#ffc107' />)
		} else {
			stars.push(<Star key={i} size={size} color='#ccc' />)
		}
	}

	return (
		<div className='flex gap-2 items-center mt-2'>
			<span className='flex'>{...stars}</span>
			<span className={text && "text-xs"}>
				({rating?.count}) {text && "Classificações"}
			</span>
		</div>
	)
}

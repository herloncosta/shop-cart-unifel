import { Star } from "lucide-react"

export const RenderStars = ({ rating, size }) => {
	const stars = []
	for (let i = 1; i <= 5; i++) {
		if (i <= rating?.rate) {
			stars.push(<Star key={i} size={size} color='#ffc107' fill='#ffc107' />)
		} else {
			stars.push(<Star key={i} size={size} color='#ccc' />)
		}
	}

	return (
		<div>
			<span className='flex mt-2'>{...stars}</span>
			<p>{rating?.count} avaliações</p>
		</div>
	)
}

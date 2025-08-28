import { Heart } from "lucide-react"
import { useFavoritesStore } from "../../store/favorites-store"

export const FavoriteButton = ({ product }) => {
	const { toggleFavorite, isFavorite } = useFavoritesStore()

	return (
		<button
			className='cursor-pointer'
			type='button'
			onClick={() => toggleFavorite(product)}
		>
			{isFavorite(product.id) ? (
				<Heart fill='#f00' color='#f00' />
			) : (
				<Heart color='#f00' />
			)}
		</button>
	)
}

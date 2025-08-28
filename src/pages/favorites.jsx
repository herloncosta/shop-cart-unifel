import { Footer } from "../components/layout/footer"
import { Navbar } from "../components/layout/navbar"
import { useFavoritesStore } from "../store/favorites-store"
import { ProductItem } from "../components/layout/product-item"

export const Favorites = () => {
	const { favorites, getFavoritesCount } = useFavoritesStore()

	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<main className='max-w-[1200px] mx-auto'>
				<h2>{getFavoritesCount()} favoritos adicionados</h2>

				<div className='grid grid-cols-4 gap-6'>
					{favorites?.map((product) => {
						return <ProductItem key={product.id} product={product} />
					})}
				</div>
			</main>
			<Footer />
		</div>
	)
}

import { Footer } from "../components/layout/footer"
import { Navbar } from "../components/layout/navbar"
import { useFavoritesStore } from "../store/favorites-store"
import { ProductItem } from "../components/layout/product-item"
import { Button } from "../components/ui/button"
import { Modal } from "../components/ui/modal"
import { Heart, Trash2, ShoppingBag } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Favorites = () => {
	const { favorites, getFavoritesCount, clearFavorites } = useFavoritesStore()
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleClearAll = () => {
		setIsModalOpen(true)
	}

	const confirmClearAll = () => {
		clearFavorites()
		setIsModalOpen(false)
	}

	const handleGoToCatalog = () => {
		navigate("/catalog")
	}

	return (
		<div className='flex flex-col min-h-screen bg-slate-50'>
			<Navbar />

			<main className='flex-1 max-w-[1200px] mx-auto w-full px-4 py-8'>
				<div className='mb-8'>
					<div className='flex items-center justify-between mb-4'>
						<div className='flex items-center gap-3'>
							<h1 className='text-3xl font-bold text-gray-800'>
								Meus Favoritos
							</h1>
						</div>

						{favorites.length > 0 && (
							<Button
								onClick={handleClearAll}
								className='w-fit flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white'
							>
								<Trash2 size={18} />
								Limpar todos
							</Button>
						)}
					</div>

					<p className='text-gray-600 text-lg'>
						{getFavoritesCount()}{" "}
						{getFavoritesCount() === 1
							? "produto favoritado"
							: "produtos favoritados"}
					</p>
				</div>

				{favorites.length === 0 ? (
					<div className='flex flex-col items-center justify-center py-20 text-center'>
						<Heart className='text-gray-300 mb-4' size={80} />
						<h2 className='text-2xl font-semibold text-gray-600 mb-4'>
							Nenhum favorito ainda
						</h2>
						<p className='text-gray-500 mb-8 max-w-md'>
							Explore nossos produtos e adicione seus favoritos clicando no
							coração
						</p>
						<Button
							onClick={handleGoToCatalog}
							className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3'
						>
							<ShoppingBag size={20} />
							Explorar Produtos
						</Button>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{favorites.map((product) => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
				)}
			</main>

			<Footer />

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title='Remover todos os favoritos'
				confirmText='Sim, remover todos'
				cancelText='Cancelar'
				onConfirm={confirmClearAll}
			>
				<div className='flex items-start gap-4'>
					<div className='flex-shrink-0'>
						<div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>
							<Trash2 className='text-red-600' size={20} />
						</div>
					</div>
					<div>
						<p className='text-gray-700 mb-2'>
							Tem certeza que deseja remover todos os produtos dos seus
							favoritos?
						</p>
						<p className='text-sm text-gray-500'>
							Esta ação não pode ser desfeita.
						</p>
					</div>
				</div>
			</Modal>
		</div>
	)
}

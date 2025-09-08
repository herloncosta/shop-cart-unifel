import { Link } from "react-router-dom"
import { useFavoritesStore } from "../../store/favorites-store"
import { useCart } from "../../context/cartContext"
import { Heart, ShoppingCart, User, X } from "lucide-react"
import { ProductSearch } from "./product-search"

export const MobileMenu = ({ isOpen, onClose }) => {
	const { getFavoritesCount } = useFavoritesStore()
	const { cartQuantity } = useCart()
	if (!isOpen) return null

	return (
		<div className='md:hidden fixed inset-0 bg-white z-50 flex flex-col'>
			<div className='p-4 flex justify-between items-center border-b'>
				<h1 className='text-xl sm:text-2xl font-bold'>
					<Link to='/' onClick={onClose}>
						UniStore
					</Link>
				</h1>

				<button
					type='button'
					onClick={onClose}
					className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
					aria-label='Fechar menu'
				>
					<X size={24} />
				</button>
			</div>

			<div className='p-4 flex-1'>
				<ProductSearch />
			</div>

			<div className='flex justify-around p-4 border-t bg-gray-50'>
				<Link
					to='/login'
					className='flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg transition-colors'
					onClick={onClose}
				>
					<User size={24} />
					<span className='text-xs mt-1 font-medium'>Login</span>
				</Link>

				<Link
					to='/favorites'
					className='flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg transition-colors'
					onClick={onClose}
				>
					<div className='relative'>
						<Heart size={24} />
						{getFavoritesCount() > 0 && (
							<span className='absolute -top-2 -right-2 bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold'>
								{getFavoritesCount()}
							</span>
						)}
					</div>
					<span className='text-xs mt-1 font-medium'>Favoritos</span>
				</Link>

				<Link
					to='/cart'
					className='flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg transition-colors'
					onClick={onClose}
				>
					<div className='relative'>
						<ShoppingCart size={24} />
						{cartQuantity > 0 && (
							<span className='absolute -top-2 -right-2 bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>
								{cartQuantity}
							</span>
						)}
					</div>
					<span className='text-xs mt-1 font-medium'>Carrinho</span>
				</Link>
			</div>
		</div>
	)
}

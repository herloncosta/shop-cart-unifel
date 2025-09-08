import { Heart, ShoppingCart, User, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/cartContext"
import { useFavoritesStore } from "../../store/favorites-store"
import { ProductSearch } from "./product-search"
import { useState } from "react"
import { MobileMenu } from "./mobile-menu"

export const Navbar = () => {
	const { cartQuantity } = useCart()
	const { getFavoritesCount } = useFavoritesStore()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<>
			<nav className='bg-slate-300 sticky top-0 z-40 shadow-md border-b-2 border-slate-400'>
				<div className='max-w-[1200px] mx-auto px-3 sm:px-4 py-2 sm:py-3'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center flex-1 min-w-0'>
							<h1 className='text-lg sm:text-xl font-bold mr-2 sm:mr-4 flex-shrink-0'>
								<Link to='/' className='hover:text-slate-600 transition-colors'>
									UniStore
								</Link>
							</h1>
							<div className='hidden lg:block flex-1 max-w-md'>
								<ProductSearch />
							</div>
						</div>

						<div className='hidden md:flex items-center gap-1 lg:gap-2'>
							<Link
								to='/login'
								className='w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-400 hover:text-slate-50 transition-colors'
								aria-label='Login'
							>
								<User size={20} />
							</Link>
							<Link
								to='/favorites'
								className='w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-400 hover:text-slate-50 transition-colors'
								aria-label='Favoritos'
							>
								<div className='relative'>
									<Heart size={20} />
									{getFavoritesCount() > 0 && (
										<span className='absolute -top-1 -right-1 bg-slate-950 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold'>
											{getFavoritesCount()}
										</span>
									)}
								</div>
							</Link>
							<Link
								to='/cart'
								className='w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-400 hover:text-slate-50 transition-colors'
								aria-label='Carrinho'
							>
								<div className='relative'>
									<ShoppingCart size={20} />
									{cartQuantity > 0 && (
										<span className='absolute -top-1 -right-1 bg-slate-950 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold'>
											{cartQuantity}
										</span>
									)}
								</div>
							</Link>
						</div>

						<button
							type='button'
							className='md:hidden p-2 hover:bg-slate-400 rounded-lg transition-colors'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label='Abrir menu'
						>
							<Menu size={24} />
						</button>
					</div>

					<div className='md:hidden mt-3'>
						<ProductSearch />
					</div>
				</div>
			</nav>

			<MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</>
	)
}

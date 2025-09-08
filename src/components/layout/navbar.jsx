import { Heart, ShoppingCart, User, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/cartContext"
import { useFavoritesStore } from "../../store/favorites-store"
import { ProductSearch } from "./product-search"
import { useState } from "react"

const MobileMenu = ({ isOpen, onClose }) => {
	const { getFavoritesCount } = useFavoritesStore()
	const { cartQuantity } = useCart()
	if (!isOpen) return null

	return (
		<div className='md:hidden fixed inset-0 bg-white z-50 flex flex-col'>
			<div className='p-4 flex justify-between items-center border-b'>
				<h1 className='text-2xl font-bold'>
					<Link to='/' onClick={onClose}>
						UniStore
					</Link>
				</h1>
				<button type='button' onClick={onClose}>
					<X size={24} />
				</button>
			</div>
			<div className='p-4'>
				<ProductSearch />
			</div>
			<div className='flex justify-around p-4 border-t'>
				<Link
					to='/login'
					className='flex flex-col items-center'
					onClick={onClose}
				>
					<User size={24} />
					<span className='text-xs mt-1'>Login</span>
				</Link>
				<Link
					to='/favorites'
					className='flex flex-col items-center'
					onClick={onClose}
				>
					<div className='relative'>
						<Heart size={24} />
						{getFavoritesCount() > 0 && (
							<span className='absolute -top-2 -right-2 bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]'>
								{getFavoritesCount()}
							</span>
						)}
					</div>
					<span className='text-xs mt-1'>Favoritos</span>
				</Link>
				<Link
					to='/cart'
					className='flex flex-col items-center'
					onClick={onClose}
				>
					<div className='relative'>
						<ShoppingCart size={24} />
						{cartQuantity > 0 && (
							<span className='absolute -top-2 -right-2 bg-slate-950 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
								{cartQuantity}
							</span>
						)}
					</div>
					<span className='text-xs mt-1'>Carrinho</span>
				</Link>
			</div>
		</div>
	)
}

export const Navbar = () => {
	const { cartQuantity } = useCart()
	const { getFavoritesCount } = useFavoritesStore()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<>
			<nav className='bg-slate-300 sticky top-0 z-40 shadow-md border-b-2 border-slate-400'>
				<div className='max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between'>
					<div className='flex items-center'>
						<h1 className='text-xl font-bold mr-4'>
							<Link to='/'>UniStore</Link>
						</h1>
						<div className='hidden md:block'>
							<ProductSearch />
						</div>
					</div>

					<div className='flex items-center gap-2'>
						<div className='hidden md:flex gap-2'>
							<Link
								to='/login'
								className='w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-slate-400 hover:text-slate-50 transition-colors'
								aria-label='Login'
							>
								<User />
							</Link>
							<Link
								to='/favorites'
								className='w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-slate-400 hover:text-slate-50 transition-colors'
								aria-label='Favoritos'
							>
								<div className='relative'>
									<Heart />
									{getFavoritesCount() > 0 && (
										<span className='absolute -top-1 -right-1 bg-slate-950 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
											{getFavoritesCount()}
										</span>
									)}
								</div>
							</Link>
							<Link
								to='/cart'
								className='w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-slate-400 hover:text-slate-50 transition-colors'
								aria-label='Carrinho'
							>
								<div className='relative'>
									<ShoppingCart />
									<span className='absolute -top-1 -right-1 bg-slate-950 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
										{cartQuantity}
									</span>
								</div>
							</Link>
						</div>

						<button
							type='button'
							className='md:hidden p-2'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label='Menu'
						>
							<Menu />
						</button>
					</div>
				</div>

				<div className='md:hidden px-4 pb-3'>
					<ProductSearch />
				</div>
			</nav>

			<MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</>
	)
}

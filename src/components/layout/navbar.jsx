import { Heart, ShoppingCart, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/cartContext"
import { ProductSearch } from "./product-search"

export const Navbar = () => {
	const { cartQuantity } = useCart()

	return (
		<nav className='bg-slate-300 sticky top-0'>
			<div className='max-w-[1200px] mx-auto py-6 flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold'>
						<Link to='/'>UniShop</Link>
					</h1>
				</div>

				<ProductSearch />

				<div className='flex gap-3'>
					<Link
						to='/login'
						className='w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-slate-400 hover:text-slate-50 transition-colors'
					>
						<User />
					</Link>
					<Link
						to='/favorites'
						className='w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-slate-400 hover:text-slate-50 transition-colors'
					>
						<Heart />
					</Link>
					<Link
						to='/cart'
						className='w-10 h-10 rounded-lg flex items-center justify-center text-primary hover:bg-slate-400 hover:text-slate-50 transition-colors'
					>
						<div className='flex gap-1 relative'>
							<span className='size-4 rounded-full flex items-center justify-center bg-slate-950 text-slate-50 absolute -right-1 -top-1'>
								{cartQuantity}
							</span>
							<ShoppingCart />
						</div>
					</Link>
				</div>
			</div>
		</nav>
	)
}

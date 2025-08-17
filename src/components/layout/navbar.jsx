import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/cartContext"

export const Navbar = () => {
	const { cartQuantity } = useCart()

	return (
		<nav className='bg-slate-300 rounded-xl sticky top-0'>
			<div className='p-6 flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold'>
						<Link to='/'>Shop Cart</Link>
					</h1>
				</div>

				<div className='flex gap-6'>
					<Link to='/'>Produtos</Link>
					<Link to='/cart'>Carrinho</Link>
					<Link to='/login'>Login</Link>

					<div className='flex gap-1 relative'>
						<span className='size-4 rounded-full flex items-center justify-center bg-slate-950 text-slate-50 absolute -right-1 -top-1'>
							{cartQuantity}
						</span>
						<ShoppingCart />
					</div>
				</div>
			</div>
		</nav>
	)
}

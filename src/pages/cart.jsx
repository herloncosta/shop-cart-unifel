import { Link } from "react-router-dom"
import { Minus, Plus, Trash } from "lucide-react"
import { Navbar } from "../components/layout/navbar"
import { useCart } from "../context/cartContext"
import { formatToBRL } from "../utils"

export const Cart = () => {
	const {
		cartItems,
		cartTotal,
		cartQuantity,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
	} = useCart()

	return (
		<main className='p-10'>
			<Navbar />

			<div className='max-w-[1200px] mx-auto'>
				<h1 className='text-3xl font-bold mt-6'>Carrinho de compras</h1>
			</div>

			{cartQuantity > 0 ? (
				<div className='max-w-[1200px] flex flex-col gap-2 mx-auto mt-6'>
					<p className='text-xl font-semi'>Detalhamento do pedido:</p>

					{cartItems.map((item) => (
						<div key={item.id} className='border-b-2 border-slate-300 py-2'>
							<div className='flex gap-6'>
								<Link to={`/product/${item.id}`}>
									<div className='w-24 h-24'>
										<img
											className='w-full h-full object-contain'
											src={item.image}
											alt={item.title}
										/>
									</div>
								</Link>

								<div>
									<p>Item: {item.title}</p>
									<p>Preço: {formatToBRL(item.price)}</p>
									<p>Quantidade: {item.quantity}</p>

									<div className='flex gap-2 mt-2'>
										<button
											className='cursor-pointer'
											type='button'
											onClick={() => decreaseQuantity(item.id)}
										>
											<Minus size={15} />
										</button>

										<button
											className='cursor-pointer'
											type='button'
											onClick={() => increaseQuantity(item.id)}
										>
											<Plus size={15} />
										</button>

										<button
											className='cursor-pointer'
											type='button'
											onClick={() => removeFromCart(item.id)}
										>
											<Trash size={15} />
										</button>
									</div>
								</div>
							</div>
						</div>
					))}

					<div className='flex justify-between mt-4'>
						<p className='text-lg font-bold'>
							{cartQuantity} itens no carrinho.
						</p>
						<p className='text-xl font-bold'>Total: {formatToBRL(cartTotal)}</p>
					</div>
				</div>
			) : (
				<div className='max-w-[1200px] flex items-center flex-col gap-6 mx-auto mt-6'>
					<div className='max-w-lg'>
						<img
							className='w-full h-full object-contain'
							src='/public/carrinho-vazio.png'
							alt='Imagem carrinho vazio'
						/>
					</div>
					<Link
						to='/'
						className='text-xl font-bold py-4 px-8 bg-slate-500 text-white rounded'
					>
						Continue comprando
					</Link>
				</div>
			)}
		</main>
	)
}

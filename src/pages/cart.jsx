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

			<div className='max-w-[600px] flex flex-col gap-2 mx-auto mt-6 p-4 border-1 border-s-slate-700 rounded-lg'>
				<p className='text-xl font-bold'>Detalhamento do pedido:</p>

				{cartItems.map((item) => (
					<div key={item.id}>
						<p>{item.title}</p>
						<p>{formatToBRL(item.price)}</p>

						<div className='flex gap-2'>
							<p>Quantidade: {item.quantity}</p>
							<button
								className='cursor-pointer'
								type='button'
								onClick={() => decreaseQuantity(item.id)}
							>
								<Minus />
							</button>

							<button
								className='cursor-pointer'
								type='button'
								onClick={() => increaseQuantity(item.id)}
							>
								<Plus />
							</button>

							<button
								className='cursor-pointer'
								type='button'
								onClick={() => removeFromCart(item.id)}
							>
								<Trash />
							</button>
						</div>
					</div>
				))}

				<div className='flex justify-between mt-4'>
					<p className='text-lg font-bold'>
						Quantidade de itens: {cartQuantity}
					</p>
					<p className='text-lg font-bold'>Total: {formatToBRL(cartTotal)}</p>
				</div>
			</div>
		</main>
	)
}

import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Minus, Plus, ShoppingBasket, Trash } from "lucide-react"
import { Navbar } from "../components/layout/navbar"
import { useCart } from "../context/cartContext"
import { formatToBRL } from "../utils"
import { RenderStars } from "../components/ui/render-stars"
import { Button } from "../components/ui/button"
import { Footer } from "../components/layout/footer"

export const Cart = () => {
	const {
		cartItems,
		cartTotal,
		cartQuantity,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
	} = useCart()
	const navigate = useNavigate()

	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<main className='flex-1'>
				<div className='max-w-[1200px] mx-auto mt-10'>
					<h1 className='text-3xl font-bold mt-6'>Carrinho de compras</h1>
				</div>

				{cartQuantity > 0 ? (
					<div className='max-w-[1200px] flex flex-col gap-2 mx-auto mt-6'>
						<div className='mt-6'>
							<p className='text-lg font-medium'>
								{cartQuantity} itens no carrinho
							</p>
						</div>

						<div className='flex gap-16'>
							<div>
								{cartItems.map((item) => (
									<div key={item.id} className='mt-2 flex'>
										<div className='flex gap-6 justify-between border-b-2 border-slate-300 py-2 w-full'>
											<Link to={`/product/${item.id}`}>
												<div className='w-24 h-24'>
													<img
														className='w-full h-full object-contain'
														src={item.image}
														alt={item.title}
													/>
												</div>
											</Link>

											<div className='max-w-lg flex-1'>
												<div>
													<p className='font-medium'>{item.title}</p>
													<p className='text-xs truncate'>{item.description}</p>
												</div>

												<div>
													<RenderStars rating={item.rating} size={12} text />
												</div>
											</div>

											<div className='flex gap-3 items-start'>
												<button
													className='cursor-pointer p-1 rounded-md hover:bg-slate-100 transition'
													type='button'
													onClick={() => decreaseQuantity(item.id)}
												>
													<Minus size={15} />
												</button>

												<button
													className='cursor-pointer p-1 rounded-md hover:bg-slate-100 transition'
													type='button'
													onClick={() => increaseQuantity(item.id)}
												>
													<Plus size={15} />
												</button>

												<button
													className='cursor-pointer p-1 rounded-md hover:bg-red-200 transition'
													type='button'
													onClick={() => removeFromCart(item.id)}
												>
													<Trash size={15} />
												</button>
											</div>

											<div className='text-right'>
												<p>
													<span className='text-sm'>Preço unitário: </span>{" "}
													<span className='font-medium'>
														{formatToBRL(item.price)}
													</span>
												</p>
												<p>
													<span className='text-sm'>Total: </span>
													<span className='font-medium'>
														{formatToBRL(item.price * item.quantity)}
													</span>
												</p>
												<p>
													<span className='text-sm'>Unidades: </span>
													<span className='font-medium'>{item.quantity}</span>
												</p>
											</div>
										</div>
									</div>
								))}
							</div>

							<div>
								<h3 className='text-2xl font-medium'>Total:</h3>
								<p className='text-4xl font-bold'>{formatToBRL(cartTotal)}</p>

								<button
									type='button'
									className='flex items-center gap-2 px-4 py-2 mt-4 bg-slate-500 text-white rounded font-bold cursor-pointer hover:bg-slate-600 transition'
									onClick={() => navigate("/checkout")}
								>
									Finalizar pedido
									<ArrowRight />
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className='max-w-[1200px] flex items-center flex-col gap-6 mx-auto mt-6'>
						<div className='max-w-lg'>
							<img
								className='w-full h-full object-contain'
								src='/carrinho-vazio.png'
								alt='Imagem carrinho vazio'
							/>
						</div>

						<Button
							onClick={() => navigate("/")}
							className='flex items-center gap-2 mt-10 w-fit hover:bg-slate-700 transition'
						>
							Continuar comprando
							<ShoppingBasket />
						</Button>
					</div>
				)}
			</main>
			<Footer />
		</div>
	)
}

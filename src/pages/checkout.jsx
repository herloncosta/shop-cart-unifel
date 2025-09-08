import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Footer } from "../components/layout/footer"
import { Navbar } from "../components/layout/navbar"
import { useCart } from "../context/cartContext"
import { formatToBRL } from "../utils"
import { Button } from "../components/ui/button"
import { ArrowLeft, Trash, Minus, Plus, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export const Checkout = () => {
	const {
		cartItems,
		cartTotal,
		cartQuantity,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
		clearCart,
	} = useCart()

	const navigate = useNavigate()
	const [orderNumber, setOrderNumber] = useState("")
	const [isOrderCompleted, setIsOrderCompleted] = useState(false)

	useEffect(() => {
		const generateOrderNumber = () => {
			const timestamp = Date.now().toString()
			const random = Math.floor(Math.random() * 1000)
				.toString()
				.padStart(3, "0")
			return `PED${timestamp.slice(-6)}${random}`
		}
		setOrderNumber(generateOrderNumber())
	}, [])

	useEffect(() => {
		if (cartQuantity === 0 && !isOrderCompleted) {
			navigate("/")
		}
	}, [cartQuantity, navigate, isOrderCompleted])

	const handleFinalizeOrder = () => {
		setIsOrderCompleted(true)
		toast.success("Pedido finalizado com sucesso!")

		setTimeout(() => {
			clearCart()
			navigate("/")
		}, 3000)
	}

	const handleRemoveItem = (productId) => {
		removeFromCart(productId)
		toast.success("Item removido do carrinho")
	}

	const handleIncreaseQuantity = (productId) => {
		increaseQuantity(productId)
	}

	const handleDecreaseQuantity = (productId) => {
		decreaseQuantity(productId)
	}

	if (isOrderCompleted) {
		return (
			<div className='flex flex-col min-h-screen'>
				<Navbar />
				<main className='flex-1 flex flex-col items-center justify-center p-8'>
					<div className='text-center max-w-md'>
						<CheckCircle className='w-20 h-20 text-green-500 mx-auto mb-6' />
						<h1 className='text-3xl font-bold mb-4 text-green-600'>
							Pedido Finalizado!
						</h1>
						<p className='text-lg mb-4'>
							Seu pedido{" "}
							<span className='font-bold text-blue-600'>{orderNumber}</span> foi
							processado com sucesso.
						</p>
						<p className='text-gray-600 mb-6'>
							Você será redirecionado para a página inicial em alguns
							segundos...
						</p>
						<Button
							onClick={() => {
								clearCart()
								navigate("/")
							}}
							className='bg-blue-600 hover:bg-blue-700'
						>
							Voltar ao início
						</Button>
					</div>
				</main>
				<Footer />
			</div>
		)
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<main className='flex-1'>
				<div className='max-w-[1200px] mx-auto mt-10 px-4'>
					<div className='flex items-center justify-between gap-4 mb-8'>
						<div>
							<Button
								variant='outline'
								onClick={() => navigate("/cart")}
								className='flex items-center gap-2'
							>
								<ArrowLeft size={20} />
								Voltar ao carrinho
							</Button>
						</div>
						<div>
							<h1 className='text-3xl font-bold'>Finalizar Pedido</h1>
							<p className='text-gray-600'>
								Número do pedido:{" "}
								<span className='font-bold text-blue-600'>{orderNumber}</span>
							</p>
						</div>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						<div className='lg:col-span-2'>
							<h2 className='text-2xl font-bold mb-6'>Resumo dos Itens</h2>
							<div className='space-y-4'>
								{cartItems.map((item) => (
									<div
										key={item.id}
										className='border rounded-lg p-4 bg-white shadow-sm'
									>
										<div className='flex gap-4'>
											<img
												src={item.image}
												alt={item.title}
												className='w-20 h-20 object-contain rounded'
											/>
											<div className='flex-1'>
												<h3 className='font-semibold text-lg'>{item.title}</h3>
												<p className='text-gray-600 text-sm'>{item.category}</p>
												<div className='flex items-center gap-4 mt-2'>
													<div className='flex items-center gap-2'>
														<button
															type='button'
															onClick={() => handleDecreaseQuantity(item.id)}
															className='w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100'
														>
															<Minus size={16} />
														</button>
														<span className='w-8 text-center font-medium'>
															{item.quantity}
														</span>
														<button
															type='button'
															onClick={() => handleIncreaseQuantity(item.id)}
															className='w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100'
														>
															<Plus size={16} />
														</button>
													</div>
													<button
														type='button'
														onClick={() => handleRemoveItem(item.id)}
														className='text-red-500 hover:text-red-700 p-1'
														title='Remover item'
													>
														<Trash size={18} />
													</button>
												</div>
											</div>
											<div className='text-right'>
												<p className='text-sm text-gray-600'>
													Preço unitário: {formatToBRL(item.price)}
												</p>
												<p className='text-lg font-bold'>
													{formatToBRL(item.price * item.quantity)}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Resumo do pedido */}
						<div className='lg:col-span-1'>
							<div className='bg-gray-50 rounded-lg p-6 sticky top-4'>
								<h3 className='text-xl font-bold mb-4'>Resumo do Pedido</h3>

								<div className='space-y-3 mb-6'>
									<div className='flex justify-between'>
										<span>Itens ({cartQuantity}):</span>
										<span>{formatToBRL(cartTotal)}</span>
									</div>
									<div className='flex justify-between'>
										<span>Frete:</span>
										<span className='text-green-600 font-semibold'>Grátis</span>
									</div>
									<hr />
									<div className='flex justify-between text-lg font-bold'>
										<span>Total:</span>
										<span>{formatToBRL(cartTotal)}</span>
									</div>
								</div>

								<Button
									onClick={handleFinalizeOrder}
									className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3'
									disabled={cartQuantity === 0}
								>
									Finalizar Pedido
								</Button>

								<p className='text-xs text-gray-500 mt-4 text-center'>
									Ao finalizar o pedido, você concorda com nossos termos de
									serviço.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}

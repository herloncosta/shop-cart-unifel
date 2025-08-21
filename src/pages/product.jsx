import { useParams, useNavigate } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { formatToBRL } from "../utils"
import { Navbar } from "../components/layout/navbar"
import { Button } from "../components/ui/button"
import { useCart } from "../context/cartContext"
import { HashLoader } from "react-spinners"
import { RenderStars } from "../components/ui/render-stars"
import { ShippingCalculator } from "../components/layout/shipping-calculator"

export const Product = () => {
	const { id } = useParams()
	const {
		data: product,
		isLoading,
		error,
	} = useFetch(`https://fakestoreapi.com/products/${id}`)
	const navigate = useNavigate()
	const { addToCart } = useCart()

	if (isLoading) {
		return (
			<main className='h-screen flex justify-center items-center'>
				<HashLoader />
			</main>
		)
	}

	if (error) {
		return <h1>Ocorreu um erro na requisição. Por favor, tente novamente!</h1>
	}

	return (
		<main className='p-10'>
			<Navbar />

			<section className='max-w-[1200px] mx-auto mt-20 flex'>
				<div className='flex-1'>
					<img src={product.image} alt={product.description} />
				</div>

				<div className='max-w-[500px] flex flex-col gap-2'>
					<span className='w-fit px-3 py-1 rounded-md text-sm font-semibold bg-slate-200'>
						{product.category}
					</span>
					<h1 className='text-xl font-bold'>{product.title}</h1>
					<h2 className='text-2xl font-bold'>{formatToBRL(product.price)}</h2>

					<RenderStars rating={product.rating} size={20} />

					<div className='mt-4'>
						<p className='text-lg font-medium'>Detalhes do produto</p>
						<p>{product.description}</p>
					</div>

					<div className='mt-4'>
						<ShippingCalculator />
					</div>

					<div className='mt-6'>
						<Button onClick={() => addToCart(product)}>
							Adicionar ao carrinho
						</Button>
					</div>

					<div className='flex gap-2'>
						<Button onClick={() => navigate("/")}>Continuar comprando</Button>

						<Button onClick={() => navigate("/cart")}>
							Ir para o carrinho
						</Button>
					</div>
				</div>
			</section>
		</main>
	)
}

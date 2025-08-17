import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { formatToBRL } from "../utils"
import { Navbar } from "../components/layout/navbar"
import { Button } from "../components/ui/button"
import { Star } from "lucide-react"
import { useCart } from "../context/cartContext"
import { HashLoader } from "react-spinners"

export const Product = () => {
	const { id } = useParams()
	const {
		data: product,
		isLoading,
		error,
	} = useFetch(`https://fakestoreapi.com/products/${id}`)

	const { addToCart } = useCart()

	const renderStars = (rating) => {
		const stars = []
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				stars.push(<Star key={i} color='#ffc107' fill='#ffc107' />)
			} else {
				stars.push(<Star key={i} color='#ccc' />)
			}
		}

		return stars
	}

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
					<h1 className='text-xl font-bold'>{product.title}</h1>
					<h2 className='text-2xl font-bold'>{formatToBRL(product.price)}</h2>

					<div>
						<p className='flex gap-1'>{renderStars(product.rating?.rate)}</p>
						<p>{product.rating?.count} avaliações</p>
					</div>

					<div className='mt-4'>
						<p className='text-lg font-medium'>Detalhes do produto</p>
						<p>{product.description}</p>
					</div>

					<div>
						<Button onClick={() => addToCart(product)}>
							Adicionar ao carrinho
						</Button>
					</div>
				</div>
			</section>
		</main>
	)
}

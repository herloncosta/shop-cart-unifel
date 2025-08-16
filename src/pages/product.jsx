import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { formatToBRL } from "../utils"

export const Product = () => {
	const { id } = useParams()
	const {
		data: product,
		isLoading,
		error,
	} = useFetch(`https://fakestoreapi.com/products/${id}`)

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	if (error) {
		return <h1>Ocorreu um erro na requisição. Por favor, tente novamente!</h1>
	}

	return (
		<main className='p-10'>
			<button type='button' onClick={() => window.history.back()}>
				Voltar
			</button>
			<section className='grid grid-cols-2 gap-6'>
				<div>
					<img src={product.image} alt={product.description} />
				</div>

				<div className='flex flex-col gap-2'>
					<h1 className='text-xl font-bold'>{product.title}</h1>
					<p>{product.description}</p>
					<h2 className='text-2xl font-bold'>{formatToBRL(product.price)}</h2>
					<p>{product.category}</p>
				</div>
			</section>
		</main>
	)
}

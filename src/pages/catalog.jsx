import { ProductItem } from "../components/layout/product-item"
import { useFetch } from "../hooks/useFetch"

export const Catalog = () => {
	const {
		data: products,
		isLoading,
		error,
	} = useFetch("https://fakestoreapi.com/products")

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	if (error) {
		return <h1>Ocorreu um erro na requisição. Por favor, tente novamente!</h1>
	}

	return (
		<main className='p-10'>
			<section>
				<h1>Produtos</h1>
			</section>
			<section className='p-10 grid grid-cols-4 gap-4'>
				{products.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</section>
		</main>
	)
}

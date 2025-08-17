import { HashLoader } from "react-spinners"
import { Navbar } from "../components/layout/navbar"
import { ProductItem } from "../components/layout/product-item"
import { useFetch } from "../hooks/useFetch"

export const Catalog = () => {
	const {
		data: products,
		isLoading,
		error,
	} = useFetch("https://fakestoreapi.com/products")

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
			<section className='max-w-[1200px] mx-auto mt-20 grid grid-cols-4 gap-4'>
				{products.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</section>
		</main>
	)
}

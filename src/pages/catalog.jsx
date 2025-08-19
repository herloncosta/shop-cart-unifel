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
		<main className='p-10 bg-slate-50'>
			<Navbar />

			<div className='max-w-[1200px] h-[400px] mx-auto mt-6'>
				<img
					src='/banner.webp'
					alt='Banner principal do catálogo'
					className='w-full h-full object-cover rounded-xl'
				/>
			</div>

			<section className='max-w-[1200px] mx-auto mt-20'>
				<div>
					<h2 className='text-xl font-medium'>Mais vendidos nessa semana</h2>
				</div>

				<div className='grid grid-cols-4 gap-4 mt-10'>
					{products.map((product) => (
						<ProductItem key={product.id} product={product} />
					))}
				</div>
			</section>
		</main>
	)
}

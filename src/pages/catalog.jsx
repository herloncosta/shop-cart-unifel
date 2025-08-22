import { useEffect, useState } from "react"
import { HashLoader } from "react-spinners"
import { Navbar } from "../components/layout/navbar"
import { ProductItem } from "../components/layout/product-item"
import { Filters } from "../components/layout/filters"
import { useFetch } from "../hooks/useFetch"
import { Footer } from "../components/layout/footer"

export const Catalog = () => {
	const {
		data: products,
		isLoading,
		error,
	} = useFetch("https://fakestoreapi.com/products")

	const [filteredProducts, setFilteredProducts] = useState([])

	useEffect(() => {
		if (products) {
			setFilteredProducts(products)
		}
	}, [products])

	const handleFilterChange = (filtered) => {
		setFilteredProducts(filtered)
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
		<>
			<Navbar />

			<main className='bg-slate-50 min-h-screen'>
				<div className='max-w-[1200px] h-[400px] mx-auto mt-6'>
					<img
						src='/banner.webp'
						alt='Banner principal do catálogo'
						className='w-full h-full object-cover rounded-xl'
					/>
				</div>

				<section className='max-w-[1200px] mx-auto mt-20'>
					<div className='flex justify-between items-center mb-6'>
						<span className='text-sm text-gray-600'>
							{filteredProducts.length} produto
							{filteredProducts.length !== 1 ? "s" : ""} encontrado
							{filteredProducts.length !== 1 ? "s" : ""}
						</span>
					</div>

					<div className='flex gap-8'>
						<aside className='w-80 flex-shrink-0'>
							<Filters
								products={products}
								onFilterChange={handleFilterChange}
							/>
						</aside>

						<div className='flex-1'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{filteredProducts.map((product) => (
									<ProductItem key={product.id} product={product} />
								))}
							</div>

							{filteredProducts.length === 0 && (
								<div className='text-center py-12'>
									<p className='text-gray-500 text-lg'>
										Nenhum produto encontrado com os filtros selecionados.
									</p>
								</div>
							)}
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	)
}

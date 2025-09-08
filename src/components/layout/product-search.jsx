import { useState, useMemo } from "react"
import { useFetch } from "../../hooks/useFetch"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const ProductSearch = () => {
	const {
		data: products,
		isLoading,
		error,
	} = useFetch("https://fakestoreapi.com/products")
	const [searchTerm, setSearchTerm] = useState("")
	const [isFocused, setIsFocused] = useState(false)
	const navigate = useNavigate()

	const filteredProducts = useMemo(() => {
		if (!searchTerm.trim()) return []

		return products.filter(
			(product) =>
				product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.category.toLowerCase().includes(searchTerm.toLowerCase()),
		)
	}, [products, searchTerm])

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value)
	}

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setTimeout(() => setIsFocused(false), 150)
	}

	if (isLoading)
		return <div className='text-sm text-gray-500'>Carregando produtos...</div>
	if (error)
		return (
			<div className='text-sm text-red-500'>
				Erro ao carregar produtos: {error.message}
			</div>
		)

	return (
		<div className='relative w-full max-w-[600px] mx-auto'>
			<div className='relative'>
				<input
					type='text'
					placeholder='Buscar produtos...'
					value={searchTerm}
					onChange={handleSearchChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200'
				/>
				<Search
					className='absolute top-2.5 sm:top-3 right-3 text-gray-400'
					size={18}
				/>
			</div>

			{isFocused && searchTerm && filteredProducts.length > 0 && (
				<div className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 sm:max-h-80 overflow-y-auto z-50'>
					<div className='p-2'>
						{filteredProducts.map((product) => (
							<div
								key={product.id}
								className='p-2 sm:p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-150'
								onKeyUp={(e) => console.log(e.key)}
								onClick={() => {
									navigate(`/product/${product.id}`)
									setSearchTerm(product.title)
									setIsFocused(false)
								}}
							>
								<div className='flex justify-between items-start gap-2'>
									<div className='flex-1 min-w-0'>
										<h4 className='font-semibold text-gray-900 text-xs sm:text-sm truncate'>
											{product.title}
										</h4>
										<p className='text-gray-600 text-xs mt-1 line-clamp-1'>
											{product.description}
										</p>
										<span className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1 sm:mt-2'>
											{product.category}
										</span>
									</div>
									<div className='flex-shrink-0'>
										<span className='font-bold text-green-600 text-xs sm:text-sm'>
											R$ {product.price.toFixed(2)}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{isFocused && searchTerm && filteredProducts.length === 0 && (
				<div className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 p-3 sm:p-4 z-50'>
					<p className='text-gray-500 text-center text-sm'>
						Nenhum produto encontrado
					</p>
				</div>
			)}
		</div>
	)
}

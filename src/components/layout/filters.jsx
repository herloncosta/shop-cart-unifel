import { Star } from "lucide-react"
import { useState } from "react"

const CATEGORIES = [
	"electronics",
	"jewelery",
	"men's clothing",
	"women's clothing",
]

const RATINGS = [5, 4, 3, 2, 1]

export const Filters = ({ products, onFilterChange, className = "" }) => {
	const [selectedCategories, setSelectedCategories] = useState([])
	const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
	const [minRating, setMinRating] = useState(0)

	const handleCategoryChange = (category) => {
		const newCategories = selectedCategories.includes(category)
			? selectedCategories.filter((c) => c !== category)
			: [...selectedCategories, category]

		setSelectedCategories(newCategories)
		applyFilters(newCategories, priceRange, minRating)
	}

	const handlePriceChange = (type, value) => {
		const newPriceRange = {
			...priceRange,
			[type]: Number.parseFloat(value) || 0,
		}
		setPriceRange(newPriceRange)
		applyFilters(selectedCategories, newPriceRange, minRating)
	}

	const handleRatingChange = (rating) => {
		const newRating = minRating === rating ? 0 : rating
		setMinRating(newRating)
		applyFilters(selectedCategories, priceRange, newRating)
	}

	const applyFilters = (categories, price, rating) => {
		const filteredProducts = products.filter((product) => {
			const categoryMatch =
				categories.length === 0 || categories.includes(product.category)

			const priceMatch =
				product.price >= price.min && product.price <= price.max

			const ratingMatch = product.rating.rate >= rating

			return categoryMatch && priceMatch && ratingMatch
		})

		onFilterChange(filteredProducts)
	}

	const clearFilters = () => {
		setSelectedCategories([])
		setPriceRange({ min: 0, max: 1000 })
		setMinRating(0)
		onFilterChange(products)
	}

	const maxPrice = Math.max(...products.map((p) => p.price), 1000)

	return (
		<div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
			<div className='flex justify-between items-center mb-6'>
				<h3 className='text-lg font-semibold text-gray-800'>Filtros</h3>
				<button
					type='button'
					onClick={clearFilters}
					className='text-sm text-blue-600 hover:text-blue-800 font-medium'
				>
					Limpar filtros
				</button>
			</div>

			{/* Filtro por Categoria */}
			<div className='mb-6'>
				<h4 className='font-medium text-gray-700 mb-3'>Categorias</h4>
				<div className='space-y-2'>
					{CATEGORIES.map((category) => (
						<label key={category} className='flex items-center'>
							<input
								type='checkbox'
								checked={selectedCategories.includes(category)}
								onChange={() => handleCategoryChange(category)}
								className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500'
							/>
							<span className='ml-2 text-sm text-gray-600 capitalize'>
								{category}
							</span>
						</label>
					))}
				</div>
			</div>

			{/* Filtro por Preço */}
			<div className='mb-6'>
				<h4 className='font-medium text-gray-700 mb-3'>Preço</h4>
				<div className='space-y-4'>
					<div>
						<label htmlFor='' className='block text-sm text-gray-600 mb-1'>
							Mínimo: R$ {priceRange.min.toFixed(2)}
						</label>
						<input
							type='range'
							min='0'
							max={maxPrice}
							value={priceRange.min}
							onChange={(e) => handlePriceChange("min", e.target.value)}
							className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
						/>
					</div>
					<div>
						<label htmlFor='' className='block text-sm text-gray-600 mb-1'>
							Máximo: R$ {priceRange.max.toFixed(2)}
						</label>
						<input
							type='range'
							min='0'
							max={maxPrice}
							value={priceRange.max}
							onChange={(e) => handlePriceChange("max", e.target.value)}
							className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
						/>
					</div>
				</div>
			</div>

			<div>
				<h4 className='font-medium text-gray-700 mb-3'>Avaliação Mínima</h4>
				<div className='space-y-2'>
					{RATINGS.map((rating) => (
						<label key={rating} className='flex items-center'>
							<input
								type='radio'
								name='rating'
								checked={minRating === rating}
								onChange={() => handleRatingChange(rating)}
								className='w-4 h-4 text-blue-600 focus:ring-blue-500'
							/>
							<span className='flex ml-2 text-sm text-gray-600'>
								{rating} <Star size={15} color='none' fill='#ffc107' /> e acima
							</span>
						</label>
					))}
				</div>
			</div>
		</div>
	)
}

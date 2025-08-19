import { Link } from "react-router-dom"
import { formatToBRL } from "../../utils"
import { RenderStars } from "../ui/render-stars"
import { Button } from "../ui/button"
import { useCart } from "../../context/cartContext"

export const ProductItem = ({ product }) => {
	const { addToCart } = useCart()

	return (
		<div className='p-6 rounded-xl hover:shadow-xl hover:bg-white transition-shadow duration-300 cursor-pointer'>
			<Link to={`/product/${product.id}`}>
				<div className='flex flex-col gap-2 justify-center'>
					<div className='w-full h-[300px]'>
						<img
							src={product.image}
							alt={product.description}
							className='h-full w-full object-contain'
						/>
					</div>

					<div className='p-3'>
						<h3 className='text-lg font-medium truncate'>{product.title}</h3>
						<p className='text-sm truncate'>{product.description}</p>

						<RenderStars rating={product.rating} size={15} />

						<p className='text-xl font-bold mt-2'>
							{formatToBRL(product.price)}
						</p>
						<p>Frete grátis</p>
					</div>
				</div>
			</Link>

			<div>
				<Button onClick={() => addToCart(product)}>
					Adicionar ao carrinho
				</Button>
			</div>
		</div>
	)
}

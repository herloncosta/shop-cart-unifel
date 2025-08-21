import { Link, useNavigate } from "react-router-dom"
import { formatToBRL } from "../../utils"
import { RenderStars } from "../ui/render-stars"
import { Button } from "../ui/button"
import { useCart } from "../../context/cartContext"
import { ShoppingBag, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

export const ProductItem = ({ product }) => {
	const { addToCart } = useCart()
	const navigate = useNavigate()

	const handleBuyNow = () => {
		addToCart(product)
		navigate("/cart")
	}

	const handleAddToCart = () => {
		addToCart(product)
		toast.success("Produto adicionado ao carrinho!", {
			duration: 2000,
			position: "top-right",
		})
	}

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

			<div className='flex gap-1'>
				<Button
					className='flex justify-between items-center hover:bg-slate-700 transition ease-in-out duration-300'
					onClick={() => handleBuyNow()}
				>
					Comprar agora
					<ShoppingBag size={20} />
				</Button>

				<Button
					className='w-fit hover:bg-slate-700 transition ease-in-out duration-300'
					onClick={() => handleAddToCart()}
				>
					<ShoppingCart size={20} />
				</Button>
			</div>
		</div>
	)
}

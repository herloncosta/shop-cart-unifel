import { Link } from "react-router-dom"

export const ProductItem = ({ product }) => {
	return (
		<Link to={`/product/${product.id}`}>
			<div>
				<div>
					<img src={product.image} alt={product.description} />
				</div>
				<div>
					<h3>{product.title}</h3>
					<p>{product.description}</p>
					<h2>{product.price}</h2>
				</div>
			</div>
		</Link>
	)
}
